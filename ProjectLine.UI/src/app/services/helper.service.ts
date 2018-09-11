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
  HomeInit: boolean;
  DiscardInit: boolean;
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
    this.HomeInit = false;
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

  removeWhiteSpaces(formGroup: FormGroup) {
    const controls = formGroup.controls;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        if (typeof controls[key].value === 'string') {
          controls[key].patchValue(controls[key].value.trim());
        }
      }
    }
  }

  removeWhiteSpacesArray(array: any) {
    for (const key in array) {
      if (array.hasOwnProperty(key)) {
        if (typeof array[key] === 'string') {
          array[key] = array[key].trim();
        }
      }
    }
  }

}
