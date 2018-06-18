import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Objective } from '../../../models/objective.model';
import { ObjectiveService } from '../../../services/objective.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-objective-add',
  templateUrl: './objective-add.component.html',
  styleUrls: ['./objective-add.component.css']
})
export class ObjectiveAddComponent implements OnInit {

  constructor(

    private fb: FormBuilder,
    private objectiveService: ObjectiveService,
    private dialogRef: MatDialogRef<ObjectiveAddComponent>

  ) { }

  formGroup: FormGroup;

  ngOnInit() {

    this.formGroup = this.fb.group({
      title: '',
      description: '',
      completed: false,
      weight: 0,
      estimated: 0,
      effort: 0,

      phaseId: 1
    });

  }

  save() {
    let objective: Objective = Object.assign({}, this.formGroup.value);
    console.table(objective);

    this.objectiveService.createObjective(objective)
      .subscribe(objective => this.onSaveSuccess(),
        error => console.error(error));
  }

  onSaveSuccess() {
    // this.router.navigate(["/Objective"]);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

} 