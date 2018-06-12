import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PhasesFormComponent } from '../../phases/phases-form/phases-form.component';

import { PhaseService } from '../../../services/phase.service';
import { ProjectService } from '../../../services/project.service';
import { Phase } from '../../../models/phase.model';
import { Project } from '../../../models/project.model';
import { ViewModelProject } from '../../../models/viewmodelproject.model';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  // Datepicker
  date = new FormControl({ value: new Date(), disabled: true });
  mindate =  new Date();
  viewmodel = new ViewModelProject();
  confirmMessage = 0;

  // Grid Add Phase to Project
  ListPhases = this.phaseService.phaseList;
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.ListPhases);

  constructor(public dialog: MatDialog, public phaseService: PhaseService,
              public projectService: ProjectService, public viewmodelProject: ViewModelProject) { }

    DateFormat(myDate: Date) {
      return `${myDate.getDate()}/${(myDate.getMonth() + 1)}/${myDate.getFullYear()}`;
    }

    AddRows() {
      const nroPhase =  this.ListPhases.length + 1;
      this.ListPhases.push({ PhaseID: 0,
                             Title: `Phase ${nroPhase}`,
                             Description: 'Description',
                             StartDate: new Date(),
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

    ngOnInit() {
      this.ListPhases = [];
      this.projectService.selectedProject = new Project();
      this.projectService.selectedProject.StartDate = new Date();
      this.projectService.selectedProject.EndDate = new Date();
    }

    onSubmit(form: NgForm) {
      this.viewmodel.Project = form.value;
      this.viewmodel.Phases = this.ListPhases;
      this.projectService.postProject(this.viewmodel).subscribe(data => {
        alert('Successfull!');
        this.resetForm();
      });
    }

    resetForm() {
      this.ListPhases = [];
      this.dataSource = new MatTableDataSource(this.ListPhases);
      this.projectService.selectedProject = new Project();
      this.confirmMessage = 0;
    }
    // limpiar el formulario
}
