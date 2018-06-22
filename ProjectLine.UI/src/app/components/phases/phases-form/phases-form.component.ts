import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PhaseService } from '../../../services/phase.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HelperService } from '../../../services/helper.service';

const helpers = new HelperService();

@Component({
  selector: 'app-phases-form',
  templateUrl: './phases-form.component.html',
  styles: [],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: helpers.formats }
  ]
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
