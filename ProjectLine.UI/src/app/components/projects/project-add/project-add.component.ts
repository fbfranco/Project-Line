import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { PhasesFormComponent } from '../../phases/phases-form/phases-form.component';

import { PhaseService } from '../../../services/phase.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { ViewModelProject } from '../../../models/viewmodelproject.model';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  viewmodel = new ViewModelProject();
  ListPhases = this.phaseService.phaseList;
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.ListPhases);

  constructor(public dialog: MatDialog,
              public phaseService: PhaseService,
              public projectService: ProjectService,
              public viewmodelProject: ViewModelProject,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.ListPhases);
  }

  DateFormat(myDate: Date) {
    const date = new Date(myDate);
    return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
  }

  AddRows() {
    const nroPhase =  this.ListPhases.length + 1;
    this.ListPhases.push({ PhaseID: 0,
                            Title: `Phase ${nroPhase}`,
                            Description: 'Description',
                            StartDate: this.projectService.selectedProject.StartDate,
                            EndDate: new Date(),
                            DemoUrl: 'demo',
                            Edit: 'Edit',
                            Delete: 'Delete'});
    this.dataSource = new MatTableDataSource(this.ListPhases);
  }

  DeleteRow(element) {
    const indexPhase = this.ListPhases.indexOf(element);

    if (confirm('Surely you want to eliminate this phase?')) {
        this.ListPhases.splice(indexPhase, 1);
        this.dataSource.filter = '';
    }
  }

  openDialog(dataPhases) {
    const dialogRef = this.dialog.open(PhasesFormComponent, {
      data: dataPhases
    });

    dialogRef.afterClosed().subscribe(result => {
      dataPhases = result;
      console.log(dataPhases);
    });
  }

  onSubmit(form: NgForm) {
    this.viewmodel.Project = form.value;
    this.viewmodel.Phases = this.ListPhases;

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
    this.ListPhases = [];
    this.dataSource = new MatTableDataSource(this.ListPhases);
    this.projectService.selectedProject = new Project();
    this.projectService.selectedProject.StartDate = new Date();
    this.projectService.selectedProject.EndDate = new Date();
  }
}
