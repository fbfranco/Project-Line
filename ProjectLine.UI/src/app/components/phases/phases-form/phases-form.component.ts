import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatTable, MatDialogRef } from '@angular/material';
import { PhaseService } from '../../../services/phase.service';
import { Phase } from '../../../models/phase.model';
import { Project } from '../../../models/project.model';

// Error Message Title
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-phases-form',
  templateUrl: './phases-form.component.html',
  styles: []
})
export class PhasesFormComponent implements OnInit {

  // DatePicker
  date = new FormControl({ value: new Date(), disabled: true });
  minDate = new Date();
  datePrueba = new Date();
  datePrueba2 = new Date();
  @ViewChild('phasesGrid') phaseTable: MatTable<Phase>;
  phaseSelected = this.phaseService.phaseList;
  // custom ErrorStateMatcher
  ErrorTitleControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  PhaseModel = new Phase();

  constructor(public dialogRef: MatDialogRef<PhasesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public phaseService: PhaseService) { }

  ngOnInit() {
    this.passDataToModel();
  }

  private passDataToModel(): void {
    this.PhaseModel.PhaseID = this.data.PhaseID;
    this.PhaseModel.Title = this.data.Title;
    this.PhaseModel.Description = this.data.Description;
    this.PhaseModel.StartDate = this.data.StartDate;
    this.PhaseModel.EndDate = this.data.EndDate;
    this.PhaseModel.DemoUrl = this.data.DemoUrl;
  }

  private passModelToData(): void {
    this.data.PhaseID = this.PhaseModel.PhaseID;
    this.data.Title = this.PhaseModel.Title;
    this.data.Description = this.PhaseModel.Description;
    this.data.StartDate = this.PhaseModel.StartDate;
    this.data.EndDate = this.PhaseModel.EndDate;
    this.data.DemoUrl = this.PhaseModel.DemoUrl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.passModelToData();
    this.dialogRef.close();
  }
}
