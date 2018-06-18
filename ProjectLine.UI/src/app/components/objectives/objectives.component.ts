import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ObjectiveAddComponent } from './objective-add/objective-add.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {

  constructor(

    public dialog: MatDialog,
    private fb: FormBuilder

  ) { }

  openDialog() {
    console.log(this.formGroup);
  }

  myForm: FormControl;
  filteredOptions: Observable<any[]>;

  formGroup: FormGroup;
  variable: string;

  options: any[] = [
    { "id": 1, "name": "colour", "cat": "red" },
    { "id": 2, "name": "colour", "cat": "blue" },
    { "id": 3, "name": "colour", "cat": "green" }
  ];

  ngOnInit(): void {
    this.myForm = new FormControl();
    this.filteredOptions = this.myForm.valueChanges
      .pipe(
        startWith(''),
        map(val => this.findOption(val))
      );

    this.formGroup = this.fb.group({
      title: '',
      description: ''
    });
  }

  findOption(val: string) {
    this.variable=val;
    console.log(val.toString()+"---------");
    return this.options.filter((s) => new RegExp(val, 'gi').test(s.cat));
  }

  displayFn(country): string {
    return country ? country.cat : country;
  }

}