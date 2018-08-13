// Config
import { Component, OnInit } from '@angular/core';
// Services
import { ProjectService } from '../../../services/project.service';
import { PhaseService } from '../../../services/phase.service';
import { HelperService } from '../../../services/helper.service';
// Models
import { Project } from '../../../models/project.model';
import { MatDialog } from '@angular/material';
// Components
import { DialogConfirmationComponent } from '../../dialog/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  // List Projects
  ListProjects: Project[];
  HeaderColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  HeaderColumnsArchived = ['Title', 'Description', 'StartDate', 'EndDate'];
  VariableSet: string;
  Home: boolean;

  constructor(
    public projectService: ProjectService,
    private phasesService: PhaseService,
    public dialog: MatDialog, private helperService: HelperService
  ) {  }

  ngOnInit() {
    this.Home = this.helperService.HomeInit;
    if (this.Home === true) {
      this.getProjectListArchived();
      this.helperService.HomeInit = false;
    } else {
      this.getProjectList();
    }
  }
  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }
  getProjectListArchived() {
    this.projectService.getArchivedProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }
  newProject() {
    this.phasesService.phaseList = [];
    this.projectService.selectedProject = new Project();
    this.projectService.selectedProject.StartDate = new Date();
    this.projectService.selectedProject.EndDate = new Date();
  }
  getSelectedProject(project: Project) {
    this.projectService.selectedProject = Object.assign({}, project);
    this.phasesService.phaseList = this.projectService.selectedProject.Phases;
  }

  DeletePasive(id) {

    this.projectService.putProjectDeletePasive(id)
      .subscribe(data => {
        this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
          this.ListProjects = datalist;
        });
      });
  }

  openDialog(ids): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: 'Please confirm...', description: 'Are you sure you want to archive this item? This action cannot be undone.' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.VariableSet = result;
      if (this.VariableSet === 'confirm') {
        this.DeletePasive(ids);
      }
    });
  }
}
