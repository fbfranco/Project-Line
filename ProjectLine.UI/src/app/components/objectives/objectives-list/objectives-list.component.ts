import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
// Services
import { ProjectService } from '../../../services/project.service';
import { PhaseService } from '../../../services/phase.service';
import { ObjectiveService } from '../../../services/objective.service';

// Models
import { Project } from '../../../models/project.model';
import { Phase } from '../../../models/phase.model';
import { Objective } from '../../../models/objective.model';

// Components
import { ObjectiveAddComponent } from '../objective-add/objective-add.component';
import { DialogConfirmationComponent } from '../../dialog/dialog-confirmation/dialog-confirmation.component';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-objectives-list',
  templateUrl: './objectives-list.component.html',
  styleUrls: ['./objectives-list.component.scss']
})

export class ObjectivesListComponent implements OnInit {

  // List Projects
  ListProjects: Project[];
  ListPhases: Phase[];
  formGroup: FormGroup;
  projectIdNumber: number;
  phaseIdNumber: number;

  // filter AutocompleteProjects
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  DataProject: Project;
  // filter AutocompletePhases
  myControlPhase = new FormControl();
  optionsPhase: string[];
  filteredOptionsPhase: Observable<string[]>;
  DataPhase: Phase;

  // List Objectives
  ListObjectives: Objective[];
  HeaderColumns = ['Title', 'Description', 'Edit', 'Delete'];

  constructor(
    public projectService: ProjectService,
    public phasesServices: PhaseService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public objectiveServices: ObjectiveService
  ) { }

  ngOnInit() {
    this.newGroup('', '');
    this.options = [];
    this.optionsPhase = [];
    this.getProjectList();
    this.DataProject = new Project;
    this.DataPhase = new Phase;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.options)
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterPhase(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsPhase.filter(option => option.toLowerCase().includes(filterValue));
  }

  setOptionsProject() {
    for (let index = 0; index < this.ListProjects.length; index++) {
      const element = this.ListProjects[index];
      this.options.push(element.Title);
    }
  }
  setOptionsPhase() {
    for (let index = 0; index < this.ListPhases.length; index++) {
      const element = this.ListPhases[index];
      this.optionsPhase.push(element.Title);
    }
  }

  newGroup(val, title): void {
    this.formGroup = this.fb.group({
      id: val,
      PhaseTitle: title
    });
  }

  // show Item Autocomplete
  displayProjectFn(project): string {
    if (!project) { return ''; }
    return project ? project.Title : project;
  }

  displayPhaseFn(phase): string {
    if (!phase) { return ''; }
    return phase ? phase.Title : phase;
  }

  // Event Get ProjectID
  projectChanged(event): void {
    this.optionsPhase = [];
    this.ListProjects.forEach(element => {
      if (element.Title === event.option.value) {
        this.DataProject = this.projectService.selectedProject = element;
      }
    });
    this.projectIdNumber = this.DataProject.ProjectID;
    this.ListObjectives = null;
    this.getPhaseList();
    this.filteredOptionsPhase = this.myControlPhase.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filterPhase(value) : this.optionsPhase)
      );
    // reset values autocomplete
    this.newGroup('', '');
    this.myControlPhase.patchValue('');

  }

  // Event Get PhaseID
  phaseChanged(event): void {
    this.ListPhases.forEach(element => {
      if (element.Title === event.option.value) {
        this.DataPhase = this.phasesServices.selectedPhase = element;
      }
    });
    this.phaseIdNumber = this.DataPhase.PhaseID;
    const title = this.formGroup.controls['PhaseTitle'].value;
    this.newGroup(this.phaseIdNumber, title);
    this.getObjectiveList();
  }

  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
      this.setOptionsProject();
    }, error => {
      console.log('Error getting the list of projects');
    });
  }

  getPhaseList() {
    this.phasesServices.getPhasesList(this.projectIdNumber).subscribe((datalistPhase: Phase[]) => {
      this.ListPhases = datalistPhase;
      this.setOptionsPhase();
    }, error => {
      console.log('Error getting the list of Phases');
    });
  }

  getObjectiveList() {
    this.objectiveServices.getObjectivesList(this.phaseIdNumber).subscribe((datalistPhase: Objective[]) => {
      this.ListObjectives = datalistPhase;
    }, error => {
      console.log('Error getting the list of Phases');
    });
  }

  openDialog() {
    if (this.phaseIdNumber > 0) {
      const dialogRef = this.dialog.open(ObjectiveAddComponent, {
        data: this.phaseIdNumber
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'save') {
          this.getObjectiveList();
        }
      });
    }
  }
  openDialogEdit(objective: Objective) {
    this.objectiveServices.selectedObjective = Object.assign({}, objective);
    const dialogRef = this.dialog.open(ObjectiveAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.getObjectiveList();
      }
    });
  }

  openDialogDelete(objective: Objective) {
    if (objective.Completed === false) {
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: { title: 'Please confirm...', description: 'Are you sure you want to remove this item?' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.objectiveServices.deleteObjective(objective)
            .subscribe(data => this.getObjectiveList(),
              error => console.error(error));
        }
      });
    } else {
      this.snackBar.open('The objective cannot be deleted. The status is completed.', 'OK', {
        horizontalPosition: 'right',
      });
    }
  }

}
