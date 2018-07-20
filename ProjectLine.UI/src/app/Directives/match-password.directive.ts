import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { MatchPassword } from '../validators/match-password.validator';


const CONFIRM_PASSWORD_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatchPassword),
  multi: true
};

@Directive({
  selector: '[match-password]',
  providers: [ CONFIRM_PASSWORD_VALIDATOR ]
})
export class MatchPasswordDirective implements Validator {
  @Input() password: string;

  validate (control: AbstractControl): {[key: string]: any} {
    return MatchPassword(this.password)(control);
  }
}
