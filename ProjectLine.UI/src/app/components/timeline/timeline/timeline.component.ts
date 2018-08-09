import { Component, OnInit, DoCheck, AfterContentInit, HostListener } from '@angular/core';

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
import { NavigationEnd, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline-filter-project.component.scss']
})
export class TimelineComponent implements OnInit, DoCheck, AfterContentInit {
  PhaseModel: Phase[];
  ListProjects: Project[];
  ListProjectsHome: Project[];

  // Variables when show the TimeLine
  Hide: boolean;
  InitTimeline: boolean;
  DisplayCard: boolean;
  isPhaseActual: boolean;
  dateFormat: string;

  // filter autocomplete
  myControl = new FormControl();
  options: Project[];
  filteredOptions: Observable<Project[]>;
  DataProject: Project;

  constructor(
    private router: Router,
    public projectService: ProjectService,
    public helperService: HelperService,
    public sanitizer: DomSanitizer
  ) { }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.dateFormat = 'MMM d';
    } else {
      this.dateFormat = 'MMMM d';
    }
  }

  onStart() {
    if (window.innerWidth < 768) {
      this.dateFormat = 'MMM d';
    } else {
      this.dateFormat = 'MMMM d';
    }
  }

  displayNameProject(project) {
    if (!project) { return ''; }
    return project.Title;
  }

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
      this.options.push(element);
    }
  }
  private _filter(value: string): Project[] {
    console.log(value);
    const filterValue = value.toString().toLowerCase();
    return this.options.filter(option => option.Title.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.DisplayCard = false;
    this.options = [];
    this.getProjectList();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.options)
      );
    this.DataProject = new Project;
    this.Hide = false;
    this.HomeInit();
    this.onStart();
  }
  ngDoCheck() {
    if (this.InitTimeline) {
      $('.VivaTimeline').vivaTimeline({ carousel: false });
      this.InitTimeline = false;
    }
  }
  // Get Project HomePage
  HomeInit() {
    if (this.projectService.selectedProjectHome) {
      this.InitTimeline = true;
      this.myControl.patchValue(this.projectService.selectedProjectHome.Title);
      this.DataProject = this.projectService.selectedProjectHome;
      this.PhaseModel = this.DataProject.Phases;
      this.sortPhaseDates(this.PhaseModel);
      this.Hide = true;
      document.execCommand($('.events-body').slideUp());

      this.PhaseModel.forEach(element => {
        if (new Date().getTime() >= new Date(element.StartDate).getTime() && new Date().getTime() <= new Date(element.EndDate).getTime()) {
          element.StatePhase = true;
        } else {
          element.StatePhase = false;
        }
      });
      this.projectService.selectedProjectHome = null;
    }
  }
  // Get the dates of the selected project
  projectChanged(event): void {
    this.InitTimeline = this.myControl.value.Title === this.DataProject.Title ? false : true;
    this.DataProject = this.myControl.value;
    this.PhaseModel = this.DataProject.Phases;
    this.sortPhaseDates(this.PhaseModel);
    this.Hide = true;
    this.PhaseModel.forEach(element => {
      if (new Date().getTime() >= new Date(element.StartDate).getTime() && new Date().getTime() <= new Date(element.EndDate).getTime()) {
        element.StatePhase = true;
      } else {
        element.StatePhase = false;
      }
    });
  }
  inputEmpty(event: any) {
    if (event !== '') {
      this.Hide = false;
      this.DisplayCard = false;
      this.DataProject = new Project;
    }
  }

  private sortPhaseDates(Phases: Phase[]): void {
    Phases.sort((a, b) => {
      const dateA: any = new Date(a.EndDate);
      const dateB: any = new Date(b.EndDate);
      return dateA - dateB; // Ascending format
    });
  }

  ngAfterContentInit() {
    this.InitTimeline = true;
  }

  getValidate(phaseDate: Date, strDate: string): boolean {
    const date = this.helperService.MonthYearFormat(phaseDate);
    let valid = false;
    if (date === strDate) {
      valid = true;
    }
    return valid;
  }

  setStyles() {
    const styles = {
      background: 'red !important'
    };
    return styles;
  }
}
