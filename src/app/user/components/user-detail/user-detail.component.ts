import { Component } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { IUser } from 'src/app/user/models/IUser';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  User!: IUser;
  private subs = new SubSink();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id)) {
      //If there is an error in the user number, return false
      this.subs.sink = this.userService.getUser(id).subscribe({
        next: (User) => {
          this.User = User;
        },
        error: (err) => {
          //An alert.component can be shown
          console.log(err);
        },
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
