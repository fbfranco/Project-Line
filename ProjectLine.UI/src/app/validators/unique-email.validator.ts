import { AbstractControl } from '@angular/forms';
// Services
import { UserService } from '../services/user.service';
export class ValidateEmailNotTaken {
  static createValidator(signupService: UserService) {
  return (control: AbstractControl) => {
    console.log('hola');
    return signupService.validateMatchEmail(control.value) ? { emailTaken: true } : null;
    };
  }
}
