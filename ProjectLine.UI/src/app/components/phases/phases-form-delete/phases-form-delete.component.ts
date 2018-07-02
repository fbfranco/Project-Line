import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PhaseService } from '../../../services/phase.service';

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

  DelteRow() {
    this.dialogRef.close('confirm');
  }
}
