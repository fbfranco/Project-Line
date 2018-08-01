import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HelperService } from '../../../services/helper.service';

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
    private phaseIdNumber: number,
    private helperService: HelperService
  ) { }

  objectiveFormGroup: FormGroup;

  ngOnInit() {
    this.newForm();
  }

  newForm() {
    this.newFormObjective();
    if (!this.phaseIdNumber) {
      this.newFormEditObjective();
    }
  }

  newFormObjective() {
    this.objectiveFormGroup = this.objectiveFormBuilder.group({
      objectiveId: 0,
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9].*')]],
      description: '',
      completed: false,
      weight: 0,
      estimated: 0,
      effort: 0,
      phaseId: this.phaseIdNumber
    });
  }

  newFormEditObjective() {
    this.objectiveFormGroup.controls['objectiveId'].patchValue(this.objectiveService.selectedObjective.ObjectiveID);
    this.objectiveFormGroup.controls['title'].patchValue(this.objectiveService.selectedObjective.Title);
    this.objectiveFormGroup.controls['description'].patchValue(this.objectiveService.selectedObjective.Description);
    this.objectiveFormGroup.controls['completed'].patchValue(this.objectiveService.selectedObjective.Completed);
  }

  submitObjective() {
    this.helperService.removeWhiteSpaces(this.objectiveFormGroup);
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
