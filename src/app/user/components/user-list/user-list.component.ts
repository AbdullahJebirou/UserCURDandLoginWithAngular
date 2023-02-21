import { Component, OnDestroy, OnInit, } from '@angular/core';
import { IUserWithPage } from 'src/app/user/models/IUserWithPage';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { alert } from 'src/app/shared/models/alert';
import { AlertType } from 'src/app/shared/models/AlertType';
import { IUser } from '../../models/IUser';
import {
  faUserPen,
  faUserPlus,
  faUserXmark,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

export class UserListComponent implements OnInit, OnDestroy {
  title = 'User';
  Users!: IUserWithPage;
  UsersFilter!: IUser[];
  listFilter!: string;

  LangArray = [{ name: "English", value: "en" },
  { name: "Arabic", value: "ar" }]
  Lang: string = "English";


  UserPlus = faUserPlus;
  UserXmark = faUserXmark;
  UserPen = faUserPen;

  alert = new alert(AlertType.none, ''); //This data object is for alert.component

  private subs = new SubSink();

  constructor(private userService: UserService, private router: Router, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.subs.sink = this.userService.getUsers().subscribe({
      next: (data) => {
        this.Users = data;
        this.UsersFilter = this.Users.data; //TODO
      },
    });
  }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  doFilter() {
    this.UsersFilter = this.Users.data.filter(
      (u) =>
        u.first_name
          .toLocaleLowerCase()
          .includes(this.listFilter.toLocaleLowerCase()) ||
        u.last_name
          .toLocaleLowerCase()
          .includes(this.listFilter.toLocaleLowerCase())
    );
  }

  changeLang() {
    this.translateService.use(this.LangArray.find(n => n.name == this.Lang)?.value!);
  }

  onLogout() {
    this.userService.removeToken();
    this.router.navigate(['./Account/Login']);
  }

  OnDelete(userId: number) {
    this.subs.sink = this.userService.deleteUser(userId).subscribe({
      next: (result) => {
        this.UsersFilter.splice(
          this.UsersFilter.findIndex((u) => u.id == userId), 1);
        this.alert = new alert(
          AlertType.Success,
          `The user has been deleted successfully`
        );
      },
      error: (err) => {
        this.alert = new alert(AlertType.Warning, 'an error occurred');
      },
    });
  }

  onChangePage(numberPage: number) {
    // update current page of items
    this.subs.sink = this.userService.getUsers(numberPage).subscribe({
      next: (data) => {
        this.Users = data;
        this.UsersFilter = this.Users.data; //TODO
      },
    });
    this.listFilter = ''; //TODO
  }
}
