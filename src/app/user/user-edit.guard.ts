import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../services/Dialog.service';
import { IDeactivateComponent } from './models/IDeactivateComponent';


@Injectable({
  providedIn: 'root'
})

export class UserEditGuard implements CanDeactivate<IDeactivateComponent> {
  constructor(private dialogService: DialogService){}

  canDeactivate(
    component: IDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return component.canExit()?true:this.dialogService.confirm('Discard changes?');
  }
  
}
