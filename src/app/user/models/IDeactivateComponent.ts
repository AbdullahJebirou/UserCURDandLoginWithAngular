import { Observable } from 'rxjs';

export interface IDeactivateComponent {
  isUserEdited: boolean;
  canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}
