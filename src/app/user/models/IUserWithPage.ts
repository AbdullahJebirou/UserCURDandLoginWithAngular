import { IPage } from './IPage';
import { IUser } from './IUser';

export interface IUserWithPage extends IPage {
  data: IUser[];
}
