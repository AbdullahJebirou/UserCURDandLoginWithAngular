import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { alert } from 'src/app/shared/models/alert';
import { AlertType } from 'src/app/shared/models/AlertType';
import { SubSink } from 'subsink';
import { IDeactivateComponent } from '../../models/IDeactivateComponent';
import { IUserForCreateRequest } from '../../models/IUserForCreateRequest';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit , IDeactivateComponent{
  
  isUserEdited = false;
  createUserForm!:FormGroup;
  alert = new alert(AlertType.none,''); //This data object is for alert.component
  private subs = new SubSink();

  constructor(private service:UserService,
              private fb:FormBuilder) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      name:['',Validators.required],
      job:['',Validators.required],
    })

  }
  onSubmit():void{
     //This function only works when the from is valid  
      let user:IUserForCreateRequest =this.createUserForm.value;
      this.subs.sink=this.service.setUser(user).subscribe({
        next:result => {
          console.log(result);
          this.alert = new alert(AlertType.Success,`The user ${result.name} was added successfully on ${result.createdAt.toString()}`)
        },
        error:err=> {
          this.alert = new alert(AlertType.Warning,err)
        }
      });
      this.createUserForm.reset()
    }

    canExit(){
      if(this.createUserForm.get('name')?.dirty || this.createUserForm.get('job')?.dirty ){
        return false;
      }
      return true;
    }

    ngOnDestroy() {
      this.subs.unsubscribe();
    }

}  
