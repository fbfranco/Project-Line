import { Phase } from './phase.model';
import { User } from './user.model';

export class Project {
  ProjectID: number;
  OwnerID: number;
  UserID: number;
  Title: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  StatusID: Number;
  Phases: Phase[];
  Active: boolean;
  User?: User;
}
