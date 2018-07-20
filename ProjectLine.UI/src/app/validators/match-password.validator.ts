import { ValidatorFn, AbstractControl } from '@angular/forms';

  export function MatchPassword(password: string): ValidatorFn {
    return function (control: AbstractControl): {[key: string]: any} {
      if (control.value != null || typeof control.value === 'string' && control.value.length !== 0) {
        return password === control.value ? null : { 'match-password': true };
      } else {
        return null;
      }
    };
}
