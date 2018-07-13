import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

// Services
import { ObjectiveService } from '../../../services/objective.service';

@Component({
  selector: 'app-objective-add',
  templateUrl: './objective-add.component.html',
  styleUrls: ['./objective-add.component.scss']
})
export class ObjectiveAddComponent implements OnInit {

  constructor(

    private objectiveFormBuilder: FormBuilder,
    private objectiveService: ObjectiveService,
    private objectiveDialogRef: MatDialogRef<ObjectiveAddComponent>,
    private objectiveSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    private objectiveRowNumber: number,

  ) { }

  objectiveFormGroup: FormGroup;

  ngOnInit() {
    console.log('this.userService.selectedUser');
    console.log(this.objectiveService);
    this.newForm();
  }

  newForm() {
    if (this.objectiveRowNumber > 0) {
      this.newFormAddObjective();
    } else {
      this.newFormEditObjective();
    }
  }

  newFormAddObjective() {
    this.objectiveFormGroup = this.objectiveFormBuilder.group({
      objectiveId: 0,
      title: '',
      description: '',
      completed: false,
      weight: 0,
      estimated: 0,
      effort: 0,
      phaseId: this.objectiveRowNumber
    });
  }

  newFormEditObjective() {
    this.objectiveFormGroup = this.objectiveFormBuilder.group({
      objectiveId: this.objectiveService.selectedObjective.ObjectiveID,
      title: this.objectiveService.selectedObjective.Title,
      description: this.objectiveService.selectedObjective.Description,
      completed: this.objectiveService.selectedObjective.Completed,
      weight: this.objectiveService.selectedObjective.Weight,
      estimated: this.objectiveService.selectedObjective.Estimated,
      effort: this.objectiveService.selectedObjective.Effort,
      phaseId: this.objectiveService.selectedObjective.PhaseID
    });
  }

  submitObjective() {
    if (this.objectiveFormGroup.controls.objectiveId.value) {
      this.editObjective();
    } else {
      this.saveObjective();
    }
  }

  saveObjective() {
    this.objectiveService.createObjective(this.objectiveFormGroup.value)
      .subscribe(good => this.onSaveSuccess(),
        error => console.error(error));
  }

  editObjective() {
    this.objectiveService.updateObjective(this.objectiveFormGroup.value)
      .subscribe(good => this.onSaveSuccess(),
        error => console.error(error));
  }

  onSaveSuccess() {
    this.objectiveSnackBar.open('Saved', null, {
      duration: 2000,
      horizontalPosition: 'right'
    });
    this.objectiveDialogRef.close('save');
  }

  onCancelClick(): void {
    this.objectiveDialogRef.close('cancel');
  }

}
