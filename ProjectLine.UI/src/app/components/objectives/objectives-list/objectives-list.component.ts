import { Component, OnInit, OnChanges } from '@angular/core';
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
import { PhaseValidate } from '../../../validators/phase-autocomplete.validator';
import { ProjectValidate } from '../../../validators/project-autocomplete.validator';

@Component({
  selector: 'app-objectives-list',
  templateUrl: './objectives-list.component.html',
  styleUrls: ['./objectives-list.component.scss']
})

export class ObjectivesListComponent implements OnInit {

  // List Projects
  formValidate = false;
  formGroup: FormGroup;
  projectIdNumber: number;
  phaseIdNumber: number;

  // filter AutocompleteProjects
  myControl = new FormControl();
  listProjects: Project[];
  filteredProyects: Observable<Project[]>;
  DataProject: Project;
  // filter AutocompletePhases
  myControlPhase = new FormControl();
  listPhases: Phase[];
  filteredPhases: Observable<Phase[]>;
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
    this.getProjectList();
    this.DataProject = new Project;
    this.DataPhase = new Phase;
  }

  resetData() {
    this.newGroup('', '');
    this.myControlPhase.patchValue('');
    this.filteredPhases = new Phase()[0];
    this.ListObjectives = [];
  }

  resetObjectives() {
    this.ListObjectives = [];
  }

   filterProject(value: string): Project[] {
    const filterValue = value.toString().toLowerCase();
    return this.listProjects.filter(option => option.Title.toLowerCase().includes(filterValue));
  }
   filterPhase(value: string): Phase[] {
    const filterValue = value.toString().toLowerCase();
    return this.listPhases.filter(option => option.Title.toLowerCase().includes(filterValue));
  }

  newGroup(val, title): void {
    this.formGroup = this.fb.group({
      id: val,
      PhaseTitle: title
    });
  }

  // Event Get ProjectID
  projectChanged(event): void {
    this.listPhases = [];
    this.projectIdNumber = this.myControl.value;
    this.ListObjectives = null;
    this.getPhaseList();
    // reset values autocomplete
    this.newGroup('', '');
    this.myControlPhase.patchValue('');
  }

  // Event Get PhaseID
  phaseChanged(event): void {
    this.phaseIdNumber = this.myControlPhase.value;
    const title = this.formGroup.controls['PhaseTitle'].value;
    this.newGroup(this.phaseIdNumber, title);
    this.getObjectiveList();
  }

  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.listProjects = datalist;
      this.filteredProyects = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this.filterProject(value) : this.listProjects)
      );
      this.myControl.setValidators([ProjectValidate(this.listProjects)]);
    }, error => {
      console.log('Error getting the list of projects');
    });
  }

  getPhaseList() {
    this.phasesServices.getPhasesList(this.myControl.value).subscribe((datalistPhase: Phase[]) => {
      this.listPhases = datalistPhase;
      this.filteredPhases = this.myControlPhase.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this.filterPhase(value) : this.listPhases)
      );
      this.myControlPhase.setValidators([PhaseValidate(this.listPhases)]);
    }, error => {
      console.log('Error getting the list of Phases');
    });
  }

  getObjectiveList() {
    this.objectiveServices.getObjectivesList(this.myControlPhase.value).subscribe((datalistPhase: Objective[]) => {
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

  displayTitleProject(ProjectID) {
    if (!ProjectID) { return ''; }
    const index = this.listProjects.findIndex(project => project.ProjectID === ProjectID);
    return this.listProjects[index].Title;
  }

  displayTitlePhase(PhaseID) {
    if (!PhaseID) { return ''; }
    const index = this.listPhases.findIndex(phase => phase.PhaseID === PhaseID);
    return this.listPhases[index].Title;
  }

}
