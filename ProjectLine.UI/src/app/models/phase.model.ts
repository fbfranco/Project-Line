import { Objective } from './objective.model';

export class Phase {
    PhaseID: number;
    Title: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    DemoUrl?: string;
    DemoVideo?: string;
    DemoName?: string;
    StatePhase?: boolean;
    Objectives?: Objective[];
}
