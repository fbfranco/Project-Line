import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {  

    //Datepicker
    date = new FormControl({ value: new Date(), disabled: true });
    //min Date
    mindate =  new Date();

    //Validate Input
    FormControl = new FormControl('', [
      Validators.required
    ]);
  
    //Call Function to active err
    matcher = new MyErrorStateMatcher();


  constructor() { }

  ngOnInit() {
  
  }

}