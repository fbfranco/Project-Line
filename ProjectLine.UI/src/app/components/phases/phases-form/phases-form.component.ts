import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { ErrorStateMatcher } from '@angular/material/core';

//Error Message Title
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

  //DatePicker
  date = new FormControl({ value: new Date(), disabled: true });
  minDate = new Date();

  //custom ErrorStateMatcher
  ErrorTitleControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit() {
  }

}
