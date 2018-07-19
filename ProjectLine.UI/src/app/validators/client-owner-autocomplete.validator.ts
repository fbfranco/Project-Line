import { User } from '../models/user.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function isSelectedValid(ListFiltered: User[]): ValidatorFn {
  const ListID = [];
  ListFiltered.forEach(element => {
    ListID.push(element.UserID.toString());
  });
  return function (control: AbstractControl): {[Key: string]: any} {
    if (control.dirty && typeof control.value === 'string') {
      return ListID.lastIndexOf(control.value) !== -1 ? null : {'isSelectedValid': true};
    } else {
      return null;
    }
  };
}
