import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  formats: {};
  SlideMenu: any;
  Ocultar: Boolean;
  HideLayout: Boolean;

  constructor() {
    this.formats = {
      parse: {
        dateInput: 'L',
      },
      display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
      }
    };
  }

  DateFormat(myDate: Date) {
    return moment(myDate).format('MM/DD/YYYY');
  }

  MonthYearFormat(myDate: Date) {
    return moment(myDate).format('MMMM YYYY');
  }

  getMonthsInRange(dateInit: Date, dateFinish: Date) {
    const dateStart = moment(dateInit);
    const dateEnd = moment(dateFinish);
    const monthsValues = [];
    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      monthsValues.push(dateStart.format('MMMM YYYY'));
      dateStart.add(1, 'month');
    }
    return monthsValues;
  }

  notAllowStartWithSpace(formGroup: FormGroup) {
    const controls = formGroup.controls;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        if (typeof controls[key].value === 'string') {
          controls[key].valueChanges.subscribe(
            data => {
              if (data.charAt(0) === ' ') {
                controls[key].patchValue(controls[key].value.trim());
              }
            }
          );
        }
      }
    }
  }

  notAllowStartWithSpaceSpecific(formGroup: FormGroup, controlName: string) {
    formGroup.controls[controlName].valueChanges.subscribe(
      data => {
        if (data.charAt(0) === ' ') {
          formGroup.controls[controlName].patchValue(
            formGroup.controls[controlName].value.trim()
          );
        }
      }
    );
  }

  removeWhiteSpaces(formGroup: FormGroup, ) {
    const controls = formGroup.controls;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        if (typeof controls[key].value === 'string') {
          controls[key].patchValue(controls[key].value.trim());
        }
      }
    }
  }

  replaceWhiteSpaces(formGroup: FormGroup, ) {
    const controls = formGroup.controls;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        if (typeof controls[key].value === 'string') {
          controls[key].patchValue(controls[key].value.replace(/\s\s+/g, ' '));
          controls[key].patchValue(controls[key].value.trim());
        }
      }
    }
  }

  notAllowStartWithSpaceControl(formControl: FormControl) {
    formControl.valueChanges.subscribe(
      data => {
        if (data.charAt(0) === ' ') {
          formControl.patchValue('');
        }
      }
    );
  }

}
