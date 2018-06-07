import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

//Add import by Dev-Sebastian
import { PhaseService } from '../../../services/phase.service';
import { ToastrService } from 'ngx-toastr';

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
  styles: [],
  providers: [PhaseService]
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

  //Edit section by Dev-Sebastian
  constructor(public phaseService: PhaseService, public toastr: ToastrService) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.phaseService.selectedPhase = {
      PhaseID: null,
      Title: '',
      Description: '',
      StartDate: null,
      EndDate: null,
      DemoUrl: ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.PhaseID == null) {
      this.phaseService.postPhase(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.phaseService.getPhaseList();
          this.toastr.success('New Record Added Seccessfully', 'Phase Register');
        })
    }
    else {
      this.phaseService.putPhase(form.value.PhaseID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.phaseService.getPhaseList();
          this.toastr.info('Record Updated Successfully', 'Phase Register');
        })
    }
  }
  //End section by Dev-Sebastian
}