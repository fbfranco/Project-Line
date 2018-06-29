import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

// Services
import { ProjectService } from '../../../services/project.service';
import { PhaseService } from '../../../services/phase.service';
import { ObjectiveService } from '../../../services/objective.service';

// Models
import { Project } from '../../../models/project.model';
import { Phase } from '../../../models/phase.model';
import { Objective } from '../../../models/objective.model';
import { ObjectiveAddComponent } from '../objective-add/objective-add.component';
import { MessageObjectiveComponent } from '../../../components/dialog/message-objective/message-objective.component';
import { MessageComponent } from '../../../components/dialog/message/message.component';

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
  projectPlaceholder: string;
  phasePlaceholder: string;

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
    this.getProjectList();
    this.newGroup('', '');
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
    this.projectIdNumber = event.option.value.ProjectID;
    this.projectPlaceholder = event.option.value.Title;
    this.getPhaseList();
    this.newGroup('', '');
    this.ListObjectives = null;
  }

  // Event Get PhaseID
  phaseChanged(event): void {
    this.phaseIdNumber = event.option.value.PhaseID;
    this.phasePlaceholder = event.option.value.Title;
    const title = this.formGroup.controls['PhaseTitle'].value;
    this.newGroup(this.phaseIdNumber, title);
    this.getObjectiveList();
  }

  getProjectList() {
    // getting service data Projects List
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }

  getPhaseList() {
    // getting service data Phases List
    this.phasesServices.getPhasesList(this.projectIdNumber).subscribe((datalistPhase: Phase[]) => {
      this.ListPhases = datalistPhase;
    }, error => {
      console.log('Error getting the list of Phases');
    });
  }

  getObjectiveList() {
    // getting service data Objectives List
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
      const dialogRef = this.dialog.open(MessageObjectiveComponent, {
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.objectiveServices.deleteObjective(objective)
            .subscribe(data => this.getObjectiveList(),
              error => console.error(error));
        }
      });
    } else {
      this.snackBar.open('The objective can`t be deleted, because is completed', 'Ok', {
        horizontalPosition: 'right'
      });
    }
  }
}
