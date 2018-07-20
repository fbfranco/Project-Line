// Config
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// Angular Material
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Services
import { PhaseService } from '../../../services/phase.service';
import { ProjectService } from '../../../services/project.service';
import { HelperService } from '../../../services/helper.service';
// Models
import { Project } from '../../../models/project.model';
import { Phase } from '../../../models/phase.model';
import { ViewModelProject } from '../../../models/viewmodelproject.model';
// Components
import { PhasesFormComponent } from '../../phases/phases-form/phases-form.component';
import { DialogConfirmationComponent } from '../../dialog/dialog-confirmation/dialog-confirmation.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
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

  titleForm = '';
  listClient: User[];
  filteredClient: Observable<User[]>;
  listOwner: User[];
  filteredOwner: Observable<User[]>;
  viewmodel = new ViewModelProject();
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.phaseService.phaseList);
  VarSet: string;
  projectFormGroup: FormGroup;
  EditMode: boolean;

  constructor(public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private projectFormBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    public phaseService: PhaseService,
    public projectService: ProjectService,
    public helperService: HelperService,
    public viewmodelProject: ViewModelProject,
    public snackBar: MatSnackBar) {
    helperService = new HelperService();
  }

  ngOnInit() {
    this.newForm();
  }

  AddRows() {
    const nroPhase = this.phaseService.phaseList.length + 1;
    this.phaseService.phaseList.push({
      PhaseID: 0,
      Title: `Phase ${nroPhase}`,
      Description: '',
      StartDate: this.projectService.selectedProject.StartDate,
      EndDate: new Date(),
      DemoUrl: 'demo'
    });
    this.dataSource = new MatTableDataSource(this.phaseService.phaseList);
  }

  DeleteRow(dataPhases) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {title: 'Please confirm...', description: 'Are you sure you want to remove this item?'}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.VarSet = result;
      if (this.VarSet === 'confirm') {

        const indexPhase = this.phaseService.phaseList.indexOf(dataPhases);
        this.phaseService.phaseList.splice(indexPhase, 1);
        this.dataSource.filter = '';
      }
    });

  }

  openDialog(dataPhases) {
    this.phaseService.indexPhase = this.phaseService.phaseList.indexOf(dataPhases);
    this.getSelectedPhase(dataPhases);
    const dialogRef = this.dialog.open(PhasesFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new MatTableDataSource(this.phaseService.phaseList);
    });
  }

  onSubmit() {
    this.listClient.forEach(element => {
      if (element.FirstName === this.projectFormGroup.value.UserId) {
        this.projectFormGroup.value.UserId = element.UserID;
      }
    });
    this.listOwner.forEach(element => {
      if (element.FirstName === this.projectFormGroup.value.OwnerId) {
        this.projectFormGroup.value.OwnerId = element.UserID;
      }
    });
    this.viewmodel.Project = this.projectFormGroup.value;
    this.viewmodel.Phases = this.phaseService.phaseList;

    if (this.projectFormGroup.value.ProjectID === '') {
      this.projectFormGroup.value.ProjectID = 0;
      this.projectService.postProject(this.viewmodel).subscribe(data => {
        this.openSnackBar('Saved');
        this.navigate_to_project_home_page();
        this.resetForm();
      });
    } else {
      this.projectService.putProject(this.viewmodel).subscribe(data => {
        this.openSnackBar('Saved');
        this.navigate_to_project_home_page();
        this.resetForm();
      });
    }
  }

  navigate_to_project_home_page() {
    this.router.navigate(['/Project']);
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
    const index = this.listClient.findIndex(client => client.UserID === UserID);
    return this.listClient[index].FirstName;
  }
  displayNameOwner(OwnerID) {
    if (!OwnerID) { return ''; }
    const index = this.listOwner.findIndex(owner => owner.UserID === OwnerID);
    return this.listOwner[index].FirstName;
  }

  test() {
    return new Promise(resolve => {
      this.buildForm();
      this.userService.getUsersByRol(3).subscribe((datalist: User[]) => {
        this.listClient = datalist;
        this.filteredClient = this.projectFormGroup.controls.UserId.valueChanges.pipe(
          startWith(''), map(value => value ? this.filter(value, 0) : this.listClient));
      }, error => { console.log(error); });
    });
  }

  async InitAutocomplete_Client_Owner() {

    await this.test().then(x => {
      alert('hola bismarck');
    });

  }

  buildForm() {
    this.userService.getUsersByRol(3).subscribe((datalist: User[]) => {
      this.listClient = datalist;
      this.filteredClient = this.projectFormGroup.controls.UserId.valueChanges.pipe(
        startWith(''), map(value => value ? this.filter(value, 0) : this.listClient));
    }, error => { console.log(error); });

    this.projectFormGroup = this.projectFormBuilder.group({
      ProjectID: '',
      UserId: ['', [Validators.required, isSelectedValid(this.listClient)]],
      OwnerId: new FormControl('', [Validators.required]),
    Title: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9].*/)]),
      Description: '',
      StartDate: new Date(),
      EndDate: new Date(),
    });
  }

  newFormEditProject() {
    this.projectFormGroup = this.projectFormBuilder.group({
      ProjectID: this.projectService.selectedProject.ProjectID,
      UserId: this.projectService.selectedProject.User.FirstName,
      OwnerId: this.projectService.selectedProject.User.FirstName,
      Title: this.projectService.selectedProject.Title,
      Description: this.projectService.selectedProject.Description,
      StartDate: this.projectService.selectedProject.StartDate,
      EndDate: this.projectService.selectedProject.EndDate,
    });
  }

  newForm() {
    this.activateRoute.params.subscribe(param => {
      if (param['id'] === undefined) {
        this.InitAutocomplete_Client_Owner();
        this.titleForm = 'Add Project';
      } else {
        this.newFormEditProject();
        this.titleForm = 'Edit Project';
      }
    });
  }
}
