import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ObjectiveAddComponent } from './objective-add/objective-add.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PhaseService } from "../../services/phase.service";
import { Phase } from '../../models/phase.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
})
export class ObjectivesComponent implements OnInit {

  binLocationForm: FormGroup;
  phaseList: Phase[] = [];
  warehouseStockCtrl: FormControl;
  filteredPhases: Observable<Phase[]>;
  phaseIdNumber: number;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private phaseService: PhaseService,
    private snackBar: MatSnackBar,
  ) {
    this.warehouseStockCtrl = new FormControl();
  }

  ngOnInit() {
    this.getPhasesList();
  }

  newGroup(): void {
    this.binLocationForm = this.fb.group({
      warehouseId: ['', Validators.required]
    });
  }

  getPhasesList(): void {
    this.phaseService.getPhaseList().subscribe((datalist: Phase[]) => {
      this.phaseList = datalist;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }

  filterInput(): void {
    this.filteredPhases = this.binLocationForm.controls.warehouseId.valueChanges
      .pipe(
        startWith(''),
        map(warehouse => warehouse ? this.filterPhases(warehouse) : this.phaseList.slice())
      );
  }

  filterPhases(warehouseFilter: string) {
    return this.phaseList.filter(val =>
      val.Title.toLowerCase().indexOf(warehouseFilter) === 0);
  }

  warehouseChanged(event): void {
    this.phaseIdNumber = event.option.value.PhaseID;
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
    } else {
      this.snackBar.open('Wait', 'Select a Phase', {
        duration: 2000,
      });
    }
  }

}