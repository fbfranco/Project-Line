import { Component, OnInit, DoCheck } from '@angular/core';
// Services
import { ProjectService } from '../../../services/project.service';
import { HelperService } from '../../../services/helper.service';
// Models
import { Phase } from '../../../models/phase.model';
import { Project } from '../../../models/project.model';
import { Observable } from 'rxjs';

import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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
  //filter autocomplete
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  DataProject:Project;

  constructor(public projectService: ProjectService, public helperService: HelperService) { }

  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
      this.setOptions();
    }, error => {
    });
  }
  setOptions() {
    for (let index = 0; index < this.ListProjects.length; index++) {
      const element = this.ListProjects[index];
      this.options.push(element.Title);
    }
  }
  ngOnInit() {
    this.options = [];
    this.getProjectList();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.options)
      );
    this.DataProject=new Project;
    this.Hide = false;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngDoCheck() {
    if (this.InitTimeline) {
      $('.VivaTimeline').vivaTimeline();
      this.InitTimeline = false;
    }
  }
  // Get the dates of the selected project
  projectChanged(event): void {
    this.ListProjects.forEach(element => {
      if (element.Title === event.option.value) {
        this.DataProject=this.projectService.selectedProject = element;
      }
    });
    this.StartDate = this.helperService.DateFormat(event.option.value.StartDate);
    this.EndDate = this.helperService.DateFormat(event.option.value.EndDate);
    this.ProjectTitle = event.option.value.Title;
    this.PhaseModel = this.DataProject.Phases;
    this.Hide = true;
    this.InitTimeline = true;
  }
  inputEmpty(event: any) {
    if (event !== '') {
      this.Hide = false;
    }
  }
}
