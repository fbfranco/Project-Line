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
    this.formGroup = this.fb.group({
      title: '',
      description: '',
      completed: false,
      weight: 0,
      estimated: 0,
      effort: 0,
      phaseId: this.data
    });
    console.log(this.data);
  }

  saveObjective() {
    let objective: Objective = Object.assign({}, this.formGroup.value);
    console.table(objective);

    this.objectiveService.createObjective(objective)
      .subscribe(objective => this.onSaveSuccess(),
        error => console.error(error));
  }

  onSaveSuccess() {
    this.snackBar.open('Successfull', 'The Objective was Created', {
      duration: 4000,
    });
    this.onCancelClick();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


} 