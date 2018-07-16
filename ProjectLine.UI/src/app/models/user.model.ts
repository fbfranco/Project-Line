import { Rol } from '../models/rol';

export class User {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Company: string;
  Address: string;
  Active: boolean;

  RoleID: number;
  Role?: Rol;
}
