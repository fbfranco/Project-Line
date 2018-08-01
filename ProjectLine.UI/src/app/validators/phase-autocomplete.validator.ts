import { Phase } from '../models/phase.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function PhaseValidate(ListFiltered: Phase[]): ValidatorFn {
  if (ListFiltered !== undefined) {
    const ListID = [];
    ListFiltered.forEach(element => {
      ListID.push(element.PhaseID.toString());
    });
    return function (control: AbstractControl): {[Key: string]: any} {
      if (control.dirty && typeof control.value === 'string' && control.value.length > 0) {
        return ListID.lastIndexOf(control.value) !== -1 ? null : {'PhaseValidate': true};
      } else {
        return null;
      }
    };
  } else {
    return null;
  }
}
