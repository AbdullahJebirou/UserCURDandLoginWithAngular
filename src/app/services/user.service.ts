import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginInfo } from '../account/models/ILoginInfo';
import { IUser } from '../user/models/IUser';
import { IUserForCreateRequest } from '../user/models/IUserForCreateRequest';
import { IUserForCreateResponse } from '../user/models/IUserForCreateResponse';
import { IUserForUpdateRequest } from '../user/models/IUserForUpdateRequest';
import { IUserForUpdateResponse } from '../user/models/IUserForUpdateResponse';
import { IUserWithPage } from '../user/models/IUserWithPage';
import { IUserWithSupport } from '../user/models/IUserWithSupport';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string = `https://reqres.in/api/users`;
  private userUrl: string = `https://reqres.in/api/users/`;
  private LoginUrl: string = `https://reqres.in/api/login`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {
    this.fireAuth.idToken.subscribe((token) => {
      this.setToken(token);
    });
  }

  GoogleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  authLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    return this.fireAuth
      .signInWithPopup(provider)
      .then((result) => { this.router.navigate(['User']) })
      .catch((error) => { console.log(error); });
  }

  setToken(token: string | null): void {
    localStorage.setItem('token', token != null ? token : '');
  }

  getToken() {
    return localStorage.getItem('token')?.toString();
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  sigIn(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setToken('1');
        console.log(result);
        this.router.navigate(['User']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  login(loginInfo: ILoginInfo): Observable<any> {
    return this.http
      .post(this.LoginUrl, loginInfo)
      .pipe(catchError(this.handleError));
  }

  setUser(user: IUserForCreateRequest): Observable<IUserForCreateResponse> {
    return this.http.post<IUserForCreateResponse>(this.userUrl, user).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUsers(page: number = 1): Observable<IUserWithPage> {
    return this.http.get<IUserWithPage>(this.usersUrl + '?page=' + page).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUser(userId: Number): Observable<IUser> {
    return this.http.get<IUserWithSupport>(this.userUrl + userId).pipe(
      map((u) => u.data),
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteUser(userId: Number): Observable<any> {
    return this.http
      .delete(this.usersUrl + '/' + userId)
      .pipe(catchError(this.handleError));
  }

  updateUser(
    user: IUserForUpdateRequest,
    userId: Number
  ): Observable<IUserForUpdateResponse> {
    return this.http
      .put<IUserForUpdateResponse>(this.usersUrl + '/' + userId, user)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = ` client-side error` + error.error.message;
    } else {
      // server-side error
      errorMessage = `server-side error ${error.status} Message:${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
