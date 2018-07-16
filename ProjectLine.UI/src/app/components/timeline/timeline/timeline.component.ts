import { Component, OnInit, DoCheck } from '@angular/core';

// Services
import { ProjectService } from '../../../services/project.service';
import { HelperService } from '../../../services/helper.service';
// Models
import { Phase } from '../../../models/phase.model';
import { Project } from '../../../models/project.model';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

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
  Hide: boolean;
  InitTimeline: boolean;

  // Variables for show month range
  dateHeader: string;
  dtHeader: boolean;

  // filter autocomplete
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  DataProject: Project;

  constructor(public projectService: ProjectService, public helperService: HelperService, public sanitizer: DomSanitizer) { }

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
    this.DataProject = new Project;
    this.Hide = false;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngDoCheck() {
    if (this.InitTimeline) {
      $('.VivaTimeline').vivaTimeline({ carousel: false });
      this.InitTimeline = false;
    }
  }
  // Get the dates of the selected project
  projectChanged(event): void {
    this.InitTimeline = event.option.value === this.DataProject.Title ? false : true;
    this.ListProjects.forEach(element => {
      if (element.Title === event.option.value) {
        this.DataProject = this.projectService.selectedProject = element;
      }
    });
    this.PhaseModel = this.DataProject.Phases;
    this.sortPhaseDates(this.PhaseModel);
    this.dateHeader = '';
    this.dtHeader = true;
    this.PhaseModel.forEach(phase => {
      phase.UrlValid = this.ExistUrl(phase.DemoUrl);
    });
    console.log(this.PhaseModel[0].UrlValid);
    this.Hide = true;
  }

  inputEmpty(event: any) {
    if (event !== '') {
      this.Hide = false;
    }
  }

  ExistUrl(url) {
    if (!this.UrlValid(url)) {
      return false;
    } else {
      const http = new XMLHttpRequest();
      http.open('GET', url, true);
      http.send();
      return http.status !== 404;
    }
  }

  UrlValid(url) {
    return url.substr(0, 21) === 'http://localhost:4200' ? true : false;
  }

  private sortPhaseDates(Phases: Phase[]): void {
    Phases.sort((a, b) => {
      const dateA: any = new Date(a.EndDate);
      const dateB: any = new Date(b.EndDate);
      return dateA - dateB; // Ascending format
    });
  }

  getDateHeader(date: Date): boolean {
    let validDate = false;
    const strDate = this.helperService.MonthYearFormat(date);
    if (strDate !== this.dateHeader) {
      this.dateHeader = strDate;
      validDate = true;
    }
    this.dtHeader = validDate;
    return validDate;
  }
}
