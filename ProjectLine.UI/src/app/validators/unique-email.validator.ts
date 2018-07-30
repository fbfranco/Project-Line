/* import { AbstractControl } from '@angular/forms';
// Services
import { UserService } from '../services/user.service';

export class ValidateEmailNotTaken {
  static createValidator(signupService: UserService) {
  return (control: AbstractControl) => {
    return signupService.validateMatchEmail(control.value) ? { emailTaken: true } : null;
    };
  }
ng} */

import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
// Services
import { UserService } from '../services/user.service';


@Injectable()
export class ValidateEmailNotTaken {

  constructor(private api: UserService) {}

    checkEmail(control: AbstractControl): any {
    return this.api.validateMatchEmail(control.value);
  }
}
