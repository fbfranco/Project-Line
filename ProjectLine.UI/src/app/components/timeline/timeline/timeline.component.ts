import { Component, OnInit } from '@angular/core';
import { Phase } from '../../../models/phase.model';
import { PhaseService } from '../../../services/phase.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

// Services
import { ProjectService } from '../../../services/project.service';
// Models
import { Project } from '../../../models/project.model';

declare var $: any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  PhaseModel: Phase[];
  ProjectID: number;

    // List Projects
    ListProjects: Project[];
    EndDate: string;
    StartDate: string;

  constructor(public projectService: ProjectService, private phaseService: PhaseService) { }

  ngOnInit() {
    $('.VivaTimeline').vivaTimeline();
    this.getProjectList();
  }

  // show Item Autocomplete
  displayProjectFn(project): string {
    if (!project) { return ''; }
    return project ? project.Title : project;
  }

  // Get the dates of the selected project
  projectChanged(event): void {
    this.EndDate = event.option.value.EndDate;
    this.StartDate = event.option.value.StartDate;
    this.ProjectID = event.option.value.ProjectID;
    this.displayPhasesOnTimeLine(this.ProjectID);
  }

  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
    this.ListProjects = datalist;
    }, error => {
    });
  }

  displayPhasesOnTimeLine(projectID: number) {
    this.phaseService.getPhasesList(projectID).subscribe((data: Phase[]) => {
      this.PhaseModel = data;
    }, error => {
    });
  }
}
