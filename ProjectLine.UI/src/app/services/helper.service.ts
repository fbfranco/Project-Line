import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import { FormGroup } from '@angular/forms';

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
              if (data.length === 1 && data === ' ') {
                controls[key].patchValue('');
              }
            }
          );
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
          const maxLength = controls[key].value.length;
          if (controls[key].value.substring(maxLength - 1, maxLength) === ' ') {
            controls[key].patchValue(controls[key].value.substring(0, maxLength - 1));
          }
        }
      }
    }
  }

  replaceWhiteSpacesControl(formGroup: FormGroup, controlName: string) {
    const control = formGroup.controls[controlName];
    control.patchValue(control.value.replace(/\s\s+/g, ' '));
    const maxLength = control.value.length;
    if (control.value.substring(maxLength - 1, maxLength) === ' ') {
      control.patchValue(control.value.substring(0, maxLength - 1));
    }
  }

}
