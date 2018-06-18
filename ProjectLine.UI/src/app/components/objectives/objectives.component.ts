import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ObjectiveAddComponent } from './objective-add/objective-add.component';
import { MatDialog } from '@angular/material';

export interface StateGroup {
  id: number;
  letter: string;
  names: string[];
}

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {

  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [{
    id: 1,
    letter: 'A',
    names: ['Alabama']
  }, {
    id: 2,
    letter: 'C',
    names: ['California']
  }];

  stateGroupOptions: Observable<StateGroup[]>;

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(val))
      );
  }

  filterGroup(val: string): StateGroup[] {
    if (val) {
      return this.stateGroups
        .map(group => ({ id: group.id, letter: group.letter, names: this._filter(group.names, val) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  private _filter(opt: string[], val: string) {
    const filterValue = val.toLowerCase();
    return opt.filter(item => item.toLowerCase().startsWith(filterValue));
  }

  openDialog() {
    const dialogRef = this.dialog.open(ObjectiveAddComponent);
  }

}
