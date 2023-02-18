import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { alert } from 'src/app/shared/models/alert';
import { AlertType } from 'src/app/shared/models/AlertType';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  alert = new alert(AlertType.none, '');

  private subs = new SubSink();

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  constructor(
    private service: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    //This function only works when the from is valid
    this.subs.sink = this.service.login(this.loginForm.value).subscribe({
      next: (result) => {
        this.service.setToken(result.token);
        this.router.navigate(['./User']);
      },
      error: (err) => {
        this.alert = new alert(AlertType.Warning, err);
        this.loginForm.setValue({
          email: '',
          password: '',
        });
      },
    });
  }

  ForgotPassword() {
    this.loginForm.setValue({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
  }
}
