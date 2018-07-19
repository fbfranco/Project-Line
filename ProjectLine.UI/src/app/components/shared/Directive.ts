import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { MatchPassword } from './Validators';


const HOUSE_STARK_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatchPassword),
  multi: true
};

@Directive({
  selector: '[stark]',
  providers: [ HOUSE_STARK_VALIDATOR ]
})
export class MatchPasswordDirective implements Validator {
  @Input() password: string;
  private validatorFn: Function;
  private onChange: Function;

  validate (control: AbstractControl): {[key: string]: any} {
    return MatchPassword(this.password)(control);
  }

//   ngOnInit () {
//     this.acceptBastards = this.acceptBastards === null || this.acceptBastards === undefined ? 
//       false : this.acceptBastards;
//   }

//   ngOnChanges (changes: SimpleChanges) {
//     let acceptBastardsChange: SimpleChange = changes['acceptBastards'];
//     this.createValidatorFunction(acceptBastardsChange.currentValue);
//     if (this.onChange) this.onChange();
//   }

//   registerOnValidatorChange(fn: () => void) { this.onChange = fn; }

//   private createValidatorFunction (acceptBastards: any) {
//     this.validatorFn = isLegitimateStark(this.acceptBastards);
  // }
}
