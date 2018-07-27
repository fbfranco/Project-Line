import { Objective } from './objective.model';

export class Phase {
    PhaseID: number;
    Title: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    DemoUrl: string;
    DemoVideo?: any;
    UrlValid?: boolean;
    StatePhase?: boolean;
    Objectives?: Objective[];
}
