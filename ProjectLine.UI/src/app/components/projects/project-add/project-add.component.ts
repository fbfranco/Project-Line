import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
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
  confirmMessage = 0;
  ListPhases = this.phaseService.phaseList;
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.ListPhases);

  constructor(public dialog: MatDialog,
              public phaseService: PhaseService,
              public projectService: ProjectService,
              public viewmodelProject: ViewModelProject) { }

  ngOnInit() {
    console.log(this.ListPhases);
  }

  DateFormat(myDate: Date) {
    return `${(myDate.getMonth() + 1)}/${myDate.getDate()}/${myDate.getFullYear()}`;
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
    console.log(this.projectService.selectedProject);
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
        alert('Successfull!');
        this.resetForm();
      });
    } else {
      this.projectService.putProject(this.viewmodel).subscribe(data => {
        alert('Successfull!');
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.ListPhases = [];
    this.dataSource = new MatTableDataSource(this.ListPhases);
    this.projectService.selectedProject = new Project();
    this.confirmMessage = 0;
  }
}
