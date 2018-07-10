import { Objective } from './objective.model';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Phase {
    PhaseID: number;
    Title: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    DemoUrl: string;
    Edit?: string;
    Delete?: string;
    UrlValid?: SafeResourceUrl;
    Objectives?: Objective[];
}
