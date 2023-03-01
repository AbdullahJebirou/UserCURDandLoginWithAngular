import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './user/guards/auth.guard';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CustomInterceptor } from './custom.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {
        path: 'User',
        loadChildren: () => import('./user/user.module').then((u) => u.UserModule),
        canLoad: [AuthGuard], // Only if the user is logged in and the token are saved in the localStorage
      },
      {
        path: 'Account',
        loadChildren: () => import('./account/account.module').then((a) => a.AccountModule),
      },

      { path: '', redirectTo: 'User', pathMatch: 'full' },
      { path: '**', redirectTo: 'User', pathMatch: 'full' },
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],

  providers: [{
    provide: FIREBASE_OPTIONS,
    useValue: environment.firebase
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
