import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Objective } from '../../../models/objective.model';
import { ObjectiveService } from '../../../services/objective.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-objective-add',
  templateUrl: './objective-add.component.html',
})
export class ObjectiveAddComponent implements OnInit {

  constructor(

    private fb: FormBuilder,
    private objectiveService: ObjectiveService,
    private dialogRef: MatDialogRef<ObjectiveAddComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: number

  ) { }

  formGroup: FormGroup;

  ngOnInit() {
    this.newForm();
  }

  newForm() {
    if (this.data > 0) {
      this.newFormAddObjective();
    } else {
      this.newFormEditObjective();
    }
  }

  newFormAddObjective() {
    this.formGroup = this.fb.group({
      id: 0,
      title: '',
      description: '',
      completed: false,
      weight: 0,
      estimated: 0,
      effort: 0,
      phaseId: this.data
    });
  }

  newFormEditObjective() {
    this.formGroup = this.fb.group({
      id: this.objectiveService.selectedObjective.ObjectiveID,
      title: this.objectiveService.selectedObjective.Title,
      description: this.objectiveService.selectedObjective.Description,
      completed: this.objectiveService.selectedObjective.Completed,
      weight: this.objectiveService.selectedObjective.Weight,
      estimated: this.objectiveService.selectedObjective.Estimated,
      effort: this.objectiveService.selectedObjective.Effort,
      phaseId: this.objectiveService.selectedObjective.PhaseID
    });
    console.log(this.formGroup.value);
  }

  submitObjective() {
    if (this.formGroup.controls['id'].value > 0) {
      this.editObjective();
    } else {
      this.saveObjective();
    }
  }

  saveObjective() {
    let objective: Objective = Object.assign({}, this.formGroup.value);
    this.objectiveService.createObjective(objective)
      .subscribe(objective => this.onSaveSuccess(),
        error => console.error(error));
  }

  editObjective() {
    let objective: Objective = Object.assign({}, this.formGroup.value);
    this.objectiveService.updateObjective(objective)
      .subscribe(objective => this.onSaveSuccess(),
        error => console.error(error));
  }

  onSaveSuccess() {
    this.snackBar.open('Saved', null, {
      duration: 2000,
      horizontalPosition: 'right'
    });
    this.dialogRef.close('save');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

} 