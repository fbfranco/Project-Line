import { Phase } from './phase.model';

export class Project {
  ProjectID: number;
  UserId: number;
  Title: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  StatusID: Number;
  Phases: Phase[];
  Active: boolean;
}
