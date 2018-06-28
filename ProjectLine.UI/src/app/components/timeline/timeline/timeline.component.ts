import { Component, OnInit } from '@angular/core';
// Services
import { ProjectService } from '../../../services/project.service';
// Models
import { Phase } from '../../../models/phase.model';
import { Project } from '../../../models/project.model';

declare var $: any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  PhaseModel: Phase[];

  // List Projects
  ListProjects: Project[];
  EndDate: string;
  StartDate: string;

  constructor(public projectService: ProjectService) { }

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
    this.PhaseModel = event.option.value.Phases;
  }

  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
    }, error => {
    });
  }
}
