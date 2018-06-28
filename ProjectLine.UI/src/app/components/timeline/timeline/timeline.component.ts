import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  PhaseModel: Phase[];

  // List Projects
  ListProjects: Project[];

  // Variables when show the TimeLine

  StartDate: any;
  EndDate: any;
  Hide: boolean;
  values = '';
  ProjectTitle: string;
  constructor(public projectService: ProjectService,private helperService: HelperService) { }

  ngOnInit() {
    $('.VivaTimeline').vivaTimeline();
    this.getProjectList();
    this.Hide = false;
  }

  // show Item Autocomplete
  displayProjectFn(project): string {
    if (!project) { return ''; }
    return project ? project.Title : project;
  }

  // Get the dates of the selected project
  projectChanged(event): void {
    console.log(event);
    this.StartDate = this.helperService.DateFormat( new Date(event.option.value.StartDate));
    this.EndDate = this.helperService.DateFormat(event.option.value.EndDate);
    this.ProjectTitle = event.option.value.Title;
    this.PhaseModel = event.option.value.Phases;
    // this.ProjectID = event.option.value.ProjectID;
    // this.displayPhasesOnTimeLine(this.ProjectID);
    this.Hide = true;
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
      console.log(this.StartDate);
    }
  }


  // displayPhasesOnTimeLine(projectID: number) {
  //   this.phaseService.getPhasesList(projectID).subscribe((data: Phase[]) => {
  //     this.PhaseModel = data;
  //   }, error => {
  //   });
  // }
}
