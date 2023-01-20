import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { ILoginInfo } from '../account/models/ILoginInfo';
import { IUser } from '../user/models/IUser';
import { IUserForCreateRequest } from '../user/models/IUserForCreateRequest';
import { IUserForCreateResponse } from '../user/models/IUserForCreateResponse';
import { IUserForUpdateRequest } from '../user/models/IUserForUpdateRequest';
import { IUserForUpdateResponse } from '../user/models/IUserForUpdateResponse';
import { IUserWithPage } from '../user/models/IUserWithPage';
import { IUserWithSupport } from '../user/models/IUserWithSupport';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl :string =`https://reqres.in/api/users?page=`;
  private userUrl :string =`https://reqres.in/api/users/`;
  private LoginUrl :string =`https://reqres.in/api/login`;


  constructor(private http: HttpClient){ }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token')?.toString();
  }
  
  removeToken(){
    localStorage.removeItem('token');
  }



  login(loginInfo:ILoginInfo):Observable<any>{
    return this.http.post(this.LoginUrl,loginInfo).pipe(
           catchError(this.handleError))      
  }

  setUser(user:IUserForCreateRequest):Observable<IUserForCreateResponse>{
    return this.http.post<IUserForCreateResponse>(this.userUrl,user).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)) 
  }
 

  getUsers(page:number=1):Observable<IUserWithPage>{
    return this.http.get<IUserWithPage>(this.usersUrl+page).pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError))
  };


  getUser(userId:Number):Observable<IUser>{
    return this.http.get<IUserWithSupport >(this.userUrl+userId).pipe(
        map(us=>us.data),
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError))
  };
  

  deleteUser(userId:Number):Observable<any>{
    return this.http.delete(this.userUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)) 
  }


  updateUser(user:IUserForUpdateRequest):Observable<any>{
    return this.http.put(this.userUrl,user).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)) 
  }
 

      
  handleError(error:HttpErrorResponse){     
        let errorMessage:string='';
        if (error.error instanceof ErrorEvent) { // client-side error
          
          errorMessage =` client-side error`+error.error.message;
        } else{  // server-side error
          errorMessage = `server-side error ${error.status} Message:${error.message}`;
        }    
      return throwError(()=>errorMessage);   
  }

}
