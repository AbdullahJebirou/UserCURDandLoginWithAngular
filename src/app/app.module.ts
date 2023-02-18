import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserGuard } from './user/guards/user.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,

    RouterModule.forRoot([
      {
        path: 'User',
        loadChildren: () => import('./user/user.module').then((u) => u.UserModule),
        canActivate: [UserGuard], // Only if the user is logged in and the token are saved in the localStorage
      },
      {
        path: 'Account',
        loadChildren: () => import('./account/account.module').then((a) => a.AccountModule),
      },

      { path: '', redirectTo: 'User', pathMatch: 'full' },
      { path: '**', redirectTo: 'User', pathMatch: 'full' },
    ]),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
