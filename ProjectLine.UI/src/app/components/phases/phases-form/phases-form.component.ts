import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PhaseService } from '../../../services/phase.service';

@Component({
  selector: 'app-phases-form',
  templateUrl: './phases-form.component.html',
  styles: []
})

export class PhasesFormComponent implements OnInit {

  phaseSelected = this.phaseService.phaseList;

  constructor(public dialogRef: MatDialogRef<PhasesFormComponent>, public phaseService: PhaseService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePhase() {
    const indexPhase = this.phaseService.indexPhase;
    this.phaseService.phaseList.splice(indexPhase, 1, this.phaseService.selectedPhase);
    this.dialogRef.close();
  }
}
