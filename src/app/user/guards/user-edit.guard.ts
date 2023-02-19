import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { IDeactivateComponent } from '../models/IDeactivateComponent';

@Injectable({
  providedIn: 'root',
})
export class UserEditGuard implements CanDeactivate<IDeactivateComponent> {
  constructor(private dialogService: DialogService ,private router: Router) {}

  canDeactivate(
    component: IDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot):| Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {

    return component.canExit()? true : (this.dialogService.confirm('Discard changes?'));

  }
}
