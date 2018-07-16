import { Rol } from '../models/rol';

export class User {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Enterprise: string;
  Address: string;
  Status: boolean;
  Mobile: number;
  Phone: number;

  RoleID?: string;
  Roles?: Rol[];
}
