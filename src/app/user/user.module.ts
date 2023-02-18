import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { SharedModule } from '../shared/shared.module';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserEditGuard } from './guards/user-edit.guard';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserCreateComponent,
    UserUpdateComponent,
  ],
  imports: [
    SharedModule,

    RouterModule.forChild([
      { path: '', component: UserListComponent },
      {
        path: 'Create',
        canDeactivate: [UserEditGuard],
        component: UserCreateComponent,
      },
      {
        path: 'Update/:id',
        canDeactivate: [UserEditGuard],
        component: UserUpdateComponent,
      },
      { path: ':id', component: UserDetailComponent },
    ]),
  ],
})
export class UserModule {}
