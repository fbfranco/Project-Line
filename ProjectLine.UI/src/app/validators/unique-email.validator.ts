import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
// Services
import { UserService } from '../services/user.service';

export class ValidateEmailUnique {
  static Validate(userService: UserService, id: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (this.IsExist(Validators.required(control))) {
        return null;
      } else {
        return new Promise((resolve) => {
          userService.validateEmailUnique(control.value, id).subscribe(data => {
            if (data) {
              resolve({emailUnique: true});
            } else {
              resolve(null);
            }
          });

        });
      }
    };
  }

  static IsExist(val: any): boolean {
    return val !== undefined && val !== null;
  }
}

