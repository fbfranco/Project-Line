import { AbstractControl } from '@angular/forms';

export function passwordConfirming(c: AbstractControl): { invalid: boolean } {
  if (c.get('Password').value !== c.get('ConfirmPassword').value) {
    return {invalid: true};
  } else { return null; }
}
