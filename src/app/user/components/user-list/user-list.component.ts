import { Component } from '@angular/core';
import { IUserWithPage } from 'src/app/user/models/IUserWithPage';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { alert } from 'src/app/shared/alert/models/alert';
import { AlertType } from 'src/app/shared/alert/models/AlertType';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent {
  title = 'User';
  
  Users!:IUserWithPage;
  alert = new alert(AlertType.none,''); //This data object is for alert.component
  private subs = new SubSink();

  constructor(private userService:UserService , private router: Router){}
 
  ngOnInit():void{
    this.subs.sink=this.userService.getUsers().subscribe({
      next:data=>{ 
        this.Users=data
    }});        
  }
  
  // Unsubscribe when the component dies
  ngOnDestroy() {
   this.subs.unsubscribe();
  }

  onLogout(){
   this.userService.removeToken();
   this.router.navigate(['./Login']);
  }

  OnDelete(userId:number){
  this.subs.sink=this.userService.deleteUser(userId).subscribe({
    next:result => {
      console.log(result);
      this.alert = new alert(AlertType.Success,`The user has been deleted successfully`)
    },
    error:err=> {
      this.alert = new alert(AlertType.Warning,"an error occurred")
    }
  });
 }

 
  onChangePage(numberPage: number) {
    // update current page of items
    this.subs.sink=this.userService.getUsers(numberPage).subscribe({
      next:data=>{
        this.Users=data
      }
    });   
  }

}