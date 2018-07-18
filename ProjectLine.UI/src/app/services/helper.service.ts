import { Injectable } from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  formats: {};
  SlideMenu: any;
  Ocultar: Boolean;

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
}
