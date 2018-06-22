import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ObjectiveAddComponent } from './objective-add/objective-add.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PhaseService } from '../../services/phase.service';
import { Phase } from '../../models/phase.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
})
export class ObjectivesComponent implements OnInit {

  formGroup: FormGroup;
  phaseList: Phase[] = [];
  phaseIdNumber: number;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private phaseService: PhaseService,
  ) { }

  ngOnInit() {
    this.newGroup('');
  }

  newGroup(val): void {
    this.formGroup = this.fb.group({
      id: val
    });
  }

  phaseChanged(event): void {
    this.phaseIdNumber = event.option.value.PhaseID;
    this.newGroup(this.phaseIdNumber);
  }

  displayFn(val): string {
    if (!val) return '';
    return val ? val.Title : val;
  }

  openDialog() {
    if (this.phaseIdNumber > 0) {
      const dialogRef = this.dialog.open(ObjectiveAddComponent, {
        data: this.phaseIdNumber
      });
    }
  }

}