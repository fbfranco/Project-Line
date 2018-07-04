// Config
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
import { DialogConfirmationComponent } from '../../../components/dialog/dialog-confirmation/dialog-confirmation.component';
// import { RoutingModule } from '../../../Routes/routing.module';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


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
  viewmodel = new ViewModelProject();
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.phaseService.phaseList);
  VarSet: string;


  constructor(public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public phaseService: PhaseService,
    public projectService: ProjectService,
    public helperService: HelperService,
    public viewmodelProject: ViewModelProject,
    public snackBar: MatSnackBar) {
    helperService = new HelperService();
  }

  ngOnInit() {
    this.titleForm = this.projectService.selectedProject.Title === undefined ? `Add Project` : `Edit Project`;
  }

  AddRows() {
    const nroPhase = this.phaseService.phaseList.length + 1;
    this.phaseService.phaseList.push({
      PhaseID: 0,
      Title: `Phase ${nroPhase}`,
      // Description: 'Descriptionnn',
      Description: '',
      StartDate: this.projectService.selectedProject.StartDate,
      EndDate: new Date(),
      DemoUrl: 'demo',
      Edit: 'Edit',
      Delete: 'Delete'
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
        console.log(this.phaseService.phaseList);
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

  onSubmit(form: NgForm) {
    this.viewmodel.Project = form.value;
    this.viewmodel.Phases = this.phaseService.phaseList;

    if (typeof form.value.ProjectID === 'undefined') {
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
      horizontalPosition: 'right'
    });
  }
  resetForm() {
    this.phaseService.phaseList = [];
    this.dataSource = new MatTableDataSource(this.phaseService.phaseList);
    this.projectService.selectedProject = new Project();
    this.projectService.selectedProject.StartDate = new Date();
    this.projectService.selectedProject.EndDate = new Date();
  }
  getSelectedPhase(phase: Phase) {
    this.phaseService.selectedPhase = Object.assign({}, phase);
  }
}
