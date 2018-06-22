import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatTable,  MatDialogRef } from '@angular/material';
import { PhaseService } from '../../../services/phase.service';
import { Phase } from '../../../models/phase.model';

@Component({
  selector: 'app-phases-form-delete',
  templateUrl: './phases-form-delete.component.html',
  styleUrls: ['./phases-form-delete.component.css']
})
export class PhasesFormDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PhasesFormDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public phaseService: PhaseService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  DelteRow(){ 
    this.dialogRef.close('confirm');
  }//
}
