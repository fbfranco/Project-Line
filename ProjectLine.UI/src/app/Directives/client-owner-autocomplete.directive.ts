import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { forwardRef, Directive, Input } from '@angular/core';
import { isSelectedValid } from '../validators/client-owner-autocomplete.validator';

const SELECTED_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SelectedValidator),
  multi: true
};

@Directive({
  selector: '[isSelectedValid]',
  providers: [ SELECTED_VALIDATOR]
})

export class SelectedValidator implements Validator {
  @Input() ListFiltered: any[];

  validate (control: AbstractControl): {[Key: string]: any} {
    return this.ListFiltered !== undefined ? null : isSelectedValid(this.ListFiltered)(control);
  }
}
