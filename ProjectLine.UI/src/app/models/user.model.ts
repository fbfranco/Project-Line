import { Rol } from './rol';

export class User {
    UserID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Company?: string;
    Address?: string;
    Phone?: string;
    Mobile?: string;
    Username: string;
    Password: string;
    Active?: boolean;
    RoleID: number;

    Roles?: Rol[];
  }
