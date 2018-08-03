// Config
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
// Angular Material
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Services
import { PhaseService } from '../../../services/phase.service';
import { ProjectService } from '../../../services/project.service';
import { HelperService } from '../../../services/helper.service';
import { UserService } from '../../../services/user.service';
// Models
import { Project } from '../../../models/project.model';
import { Phase } from '../../../models/phase.model';
import { User } from '../../../models/user.model';
// Components
import { PhasesFormComponent } from '../../phases/phases-form/phases-form.component';
import { DialogConfirmationComponent } from '../../dialog/dialog-confirmation/dialog-confirmation.component';
// Validators
import { isSelectedValid } from '../../../validators/client-owner-autocomplete.validator';

const helpers = new HelperService();

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: helpers.formats },
  ]
})
export class ProjectAddComponent implements OnInit {

  projectFormGroup: FormGroup;
  titleForm = '';
  listClient: User[];
  filteredClient: Observable<User[]>;
  errorDisplayClient: boolean;
  listOwner: User[];
  filteredOwner: Observable<User[]>;
  project = new Project();
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.phaseService.phaseList);
  varSet: string;
  projectFG: FormGroup;

  constructor(public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private projectFB: FormBuilder,
    private router: Router,
    private userService: UserService,
    private phaseService: PhaseService,
    private projectService: ProjectService,
    public helperService: HelperService,
    private snackBar: MatSnackBar) {
    helperService = new HelperService();
  }

  ngOnInit() {
    this.buildForm();
    this.loadClient();
    this.loadOwner();
    this.addOrEditForm();
  }

  AddRows() {
    this.phaseService.phaseList.push({
      PhaseID: 0,
      Title: `New Phase`,
      Description: '',
      StartDate: this.projectFG.get('StartDate').value,
      EndDate: new Date()
    });
    this.dataSource = new MatTableDataSource(this.phaseService.phaseList);
  }

  DeleteRow(dataPhases) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: 'Please confirm...', description: 'Are you sure you want to remove this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.varSet = result;
      if (this.varSet === 'confirm') {

        const indexPhase = this.phaseService.phaseList.indexOf(dataPhases);
        this.phaseService.phaseList.splice(indexPhase, 1);
        this.dataSource.filter = '';
      }
    });
  }

  trimSelectedPhase() {
    const phase = this.phaseService.phaseList;
    const index = this.phaseService.indexPhase;
    this.helperService.removeWhiteSpacesArray(phase[index]);
  }

  openDialog(dataPhases) {
    this.phaseService.indexPhase = this.phaseService.phaseList.indexOf(dataPhases);
    this.getSelectedPhase(dataPhases);
    const dialogRef = this.dialog.open(PhasesFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.trimSelectedPhase();
      this.dataSource = new MatTableDataSource(this.phaseService.phaseList);
    });
  }
  getUserIdtoSaveProject(list, control) {
    list.forEach(element => {
      if (element.FirstName === control) {
        control = element.UserID;
      }
    });
  }
  onSubmit() {
    this.helperService.removeWhiteSpaces(this.projectFG);
    this.getUserIdtoSaveProject(this.listClient, this.projectFG.value.UserId);
    this.getUserIdtoSaveProject(this.listOwner, this.projectFG.value.OwnerId);
    this.project = this.projectFG.value;
    this.project.Phases = this.phaseService.phaseList;

    if (this.projectFG.value.ProjectID === '') {
      this.projectFG.value.ProjectID = 0;
      this.projectService.postProject(this.project).subscribe(data => {
        this.openSnackBar('Saved');
        this.navigate_to_project_home_page();
        this.resetForm();
      });
    } else {
      this.projectService.putProject(this.project).subscribe(data => {
        this.openSnackBar('Saved');
        this.navigate_to_project_home_page();
        this.resetForm();
      });
    }
  }

  navigate_to_project_home_page() {
    this.router.navigate(['/Projects']);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      horizontalPosition: 'right',
    });
  }
  resetForm() {
    this.phaseService.phaseList = [];
    this.dataSource = new MatTableDataSource(this.phaseService.phaseList);
    this.projectService.selectedProject = new Project();
  }

  getSelectedPhase(phase: Phase) {
    this.phaseService.selectedPhase = Object.assign({}, phase);
  }

  filter(value: string, type: number): User[] {
    const filterValue = value.toString().toLowerCase();
    return type === 0 ?
      this.listClient.filter(option => option.FirstName.toLowerCase().includes(filterValue)) :
      this.listOwner.filter(option => option.FirstName.toLowerCase().includes(filterValue));
  }

  displayNameClient(UserID) {
    if (!UserID) { return ''; }
    const index = this.listClient.findIndex(client => client.UserID.toString() === UserID.split(',').pop());
    return this.listClient[index].FirstName;
  }

  displayNameOwner(OwnerID) {
    if (!OwnerID) { return ''; }
    const index = this.listOwner.findIndex(owner => owner.UserID.toString() === OwnerID.split(',').pop());
    return this.listOwner[index].FirstName;
  }

  loadClient() {
    this.userService.getUsersByRol(3).subscribe((datalist: User[]) => {
      this.listClient = datalist;
      this.filteredClient = this.projectFG.controls.UserId.valueChanges.pipe(
        startWith(''), map(value => value ? this.filter(value, 0) : this.listClient));
      this.projectFG.controls['UserId'].setValidators([isSelectedValid(this.listClient), Validators.pattern(/^[a-zA-Z].*/)]);
    }, error => { console.log(error); });
  }

  loadOwner() {
    this.userService.getUsersByRol(2).subscribe((datalist: User[]) => {
      this.listOwner = datalist;
      this.filteredOwner = this.projectFG.controls.OwnerId.valueChanges.pipe(
        startWith(''), map(value => value ? this.filter(value, 1) : this.listOwner));
      this.projectFG.controls['OwnerId'].setValidators([isSelectedValid(this.listOwner), Validators.pattern(/^[a-zA-Z].*/)]);
    }, error => { console.log(error); });
  }

  buildForm() {
    this.projectFG = this.projectFB.group({
      ProjectID: [''],
      UserId: [''],
      OwnerId: [''],
      Title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9].*/)]],
      Description: [''],
      StartDate: [new Date(), [Validators.required]],
      EndDate: [new Date(), [Validators.required]],
    });
  }

  newFormEditProject() {
    this.projectFG.patchValue({
      ProjectID: this.projectService.selectedProject.ProjectID,
      UserId: this.projectService.selectedProject.UserID,
      OwnerId: this.projectService.selectedProject.OwnerID,
      Title: this.projectService.selectedProject.Title,
      Description: this.projectService.selectedProject.Description,
      StartDate: this.projectService.selectedProject.StartDate,
      EndDate: this.projectService.selectedProject.EndDate,
    });
  }

  addOrEditForm() {
    this.activateRoute.params.subscribe(param => {
      if (param['id'] === undefined) {
        this.titleForm = 'Add Project';
      } else {
        setTimeout(() => {
          this.newFormEditProject();
        }, 500);
        this.titleForm = 'Edit Project';
      }
    });
  }
}
