import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
 
  constructor(private service:UserService , private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
   // Only if the user is logged in and the token are saved in the localStorage
      
  if (this.service.getToken()?.length) {
    return true;
  }
  
  this.router.navigate(['/Login']);
  return false;
  }
  
}
