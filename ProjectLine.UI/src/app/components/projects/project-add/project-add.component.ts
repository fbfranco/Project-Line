import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { PhasesFormComponent } from '../../phases/phases-form/phases-form.component';

import { PhaseService } from '../../../services/phase.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { Phase } from '../../../models/phase.model';
import { ViewModelProject } from '../../../models/viewmodelproject.model';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  viewmodel = new ViewModelProject();
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.phaseService.phaseList);

  constructor(public dialog: MatDialog,
              public phaseService: PhaseService,
              public projectService: ProjectService,
              public viewmodelProject: ViewModelProject,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  DateFormat(myDate: Date) {
    const date = new Date(myDate);
    const month = (date.getMonth() + 1) < 9 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
    return `${month}/${date.getDate()}/${date.getFullYear()}`;
  }

  AddRows() {
    const nroPhase =  this.phaseService.phaseList.length + 1;
    this.phaseService.phaseList.push({ PhaseID: 0,
                            Title: `Phase ${nroPhase}`,
                            Description: 'Description',
                            StartDate: this.projectService.selectedProject.StartDate,
                            EndDate: new Date(),
                            DemoUrl: 'demo',
                            Edit: 'Edit',
                            Delete: 'Delete'});
    this.dataSource = new MatTableDataSource(this.phaseService.phaseList);
  }

  DeleteRow(element) {
    const indexPhase = this.phaseService.phaseList.indexOf(element);

    if (confirm('Surely you want to eliminate this phase?')) {
        this.phaseService.phaseList.splice(indexPhase, 1);
        this.dataSource.filter = '';
    }
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
        this.resetForm();
      });
    } else {
      this.projectService.putProject(this.viewmodel).subscribe(data => {
        this.openSnackBar('Saved');
        this.resetForm();
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
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
