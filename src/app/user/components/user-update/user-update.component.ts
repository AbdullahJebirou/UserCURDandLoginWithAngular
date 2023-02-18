import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { alert } from 'src/app/shared/models/alert';
import { AlertType } from 'src/app/shared/models/AlertType';
import { UserService } from 'src/app/services/user.service';
import { IUserForCreateRequest } from '../../models/IUserForCreateRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeactivateComponent } from '../../models/IDeactivateComponent';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements IDeactivateComponent {

  isUserEdited = false;
  updateUserForm!:FormGroup;
  id = Number(this.route.snapshot.paramMap.get('id'));

  alert = new alert(AlertType.none,''); //This data object is for alert.component


  private subs = new SubSink();

  constructor(private service:UserService,
              private fb:FormBuilder ,
              private route:ActivatedRoute ,
              private router: Router  ) {}

  ngOnInit(): void {

    this.subs.sink=this.service.getUser(this.id).subscribe({
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
      this.subs.sink=this.service.updateUser(user,this.id).subscribe({
        next:result => {
          console.log(result);
          //this.alert = new alert(AlertType.Success,`The user ${result.name} has been successfully updated on ${result.updatedAt.toString()}`)
          this.router.navigate(['./User']);
        },
        error:err=> {
          this.alert = new alert(AlertType.Warning,'an error occurred')
        }
      });
      this.isUserEdited = true;
    }

    canExit(){
      if(!this.isUserEdited && this.updateUserForm.dirty){
        return false;
      }
      return true;
    }


    ngOnDestroy() {
      this.subs.unsubscribe();
    }

}  
