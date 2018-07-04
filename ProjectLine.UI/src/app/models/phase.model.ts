import { Objective } from "./objective.model";

export class Phase {
    PhaseID: number;
    Title: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    DemoUrl: string;
    Edit?: string;
    Delete?: string;
    Objectives?: Objective[];
}
