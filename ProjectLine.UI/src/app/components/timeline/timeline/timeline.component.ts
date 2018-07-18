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
      $('.VivaTimeline').vivaTimeline({carousel: false});
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
    this.PhaseModel.forEach(phase => {
      phase.UrlValid = this.sanitizer.bypassSecurityTrustResourceUrl(phase.DemoUrl);
    });
    console.log(this.PhaseModel[0].UrlValid);
    this.Hide = true;
  }

  inputEmpty(event: any) {
    if (event !== '') {
      this.Hide = false;
    }
  }

}
