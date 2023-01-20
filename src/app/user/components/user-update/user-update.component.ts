import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { alert } from 'src/app/shared/alert/models/alert';
import { AlertType } from 'src/app/shared/alert/models/AlertType';
import { UserService } from 'src/app/services/user.service';
import { IUserForCreateRequest } from '../../models/IUserForCreateRequest';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

  updateUserForm!:FormGroup;

  alert = new alert(AlertType.none,''); //This data object is for alert.component

  private subs = new SubSink();

  constructor(private service:UserService,
              private fb:FormBuilder ,
              private route:ActivatedRoute ) {}

  ngOnInit(): void {

    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.subs.sink=this.service.getUser(id).subscribe({
       next:date=>{
         this.updateUserForm.setValue({
          name:date.first_name,
          job:date.last_name
        })},
        //If there is an error in the user number or an error occurs, an alert will appear with a message explaining the error
        error:err=> {
          this.alert = new alert(AlertType.Warning,err)
        }
      }); 


    this.updateUserForm = this.fb.group({
      name:['',Validators.required],
      job:['',Validators.required],
    })

  }
  onSubmit():void{

     //This function only works when the from is valid  

      let user:IUserForCreateRequest =this.updateUserForm.value;
      this.subs.sink=this.service.updateUser(user).subscribe({
        next:result => {
          console.log(result);
          this.alert = new alert(AlertType.Success,`The user ${result.name} has been successfully updated on 1/1/200 ${result.updatedAt.toString()}`)
        },
        error:err=> {
          this.alert = new alert(AlertType.Warning,'an error occurred')
        }
      });
    }

    ngOnDestroy() {
      this.subs.unsubscribe();
    }

}  
