import { Component, OnInit, DoCheck } from '@angular/core';
// Services
import { ProjectService } from '../../../services/project.service';
import { HelperService } from '../../../services/helper.service';
// Models
import { Phase } from '../../../models/phase.model';
import { Project } from '../../../models/project.model';

declare var $: any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline-filter-project.component.scss']
})
export class TimelineComponent implements OnInit, DoCheck {
  PhaseModel: Phase[];
  ListProjects: Project[];

  // Variables when show the TimeLine
  StartDate: any;
  EndDate: any;
  ProjectTitle: string;

  Hide: boolean;
  InitTimeline: boolean;
  constructor(public projectService: ProjectService, public helperService: HelperService) { }

  ngOnInit() {
    this.getProjectList();
    this.Hide = false;
  }

  ngDoCheck() {
    if (this.InitTimeline) {
      $('.VivaTimeline').vivaTimeline();
      this.InitTimeline = false;
    }
  }

  // show Item Autocomplete
  displayProjectFn(project): string {
    if (!project) { return ''; }
    return project ? project.Title : project;
  }

  // Get the dates of the selected project
  projectChanged(event): void {
    this.StartDate = this.helperService.DateFormat(event.option.value.StartDate);
    this.EndDate = this.helperService.DateFormat(event.option.value.EndDate);
    this.ProjectTitle = event.option.value.Title;
    this.PhaseModel = event.option.value.Phases;
    this.Hide = true;
    this.InitTimeline = true;
  }

  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
    }, error => {
    });
  }

  inputEmpty(event: any) {
    if (event !== '') {
      this.Hide = false;
    }
  }
}
