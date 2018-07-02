import { Injectable } from '@angular/core';
import * as _moment from 'moment';

const moment =  _moment;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  formats: {};
  SlideMenu: any;

  constructor() {
    this.formats = {
      parse: {
        dateInput: 'L',
      },
      display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY' ,
        dateA11yLabel: 'LL' ,
        monthYearA11yLabel: 'MMMM YYYY'
      }
    };
  }

  DateFormat(myDate: Date) {
    return moment(myDate).format('MM/DD/YYYY');
  }
}
