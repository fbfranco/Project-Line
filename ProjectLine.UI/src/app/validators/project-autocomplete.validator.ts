import { Project } from '../models/project.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function ProjectValidate(ListFiltered: Project[]): ValidatorFn {
  if (ListFiltered !== undefined) {
    const ListID = [];
    ListFiltered.forEach(element => {
      ListID.push(element.ProjectID.toString());
    });
    return function (control: AbstractControl): {[Key: string]: any} {
      if (control.dirty && typeof control.value === 'string' && control.value.length > 0) {
        return ListID.lastIndexOf(control.value) !== -1 ? null : {'ProjectValidate': true};
      } else {
        return null;
      }
    };
  } else {
    return null;
  }
}
