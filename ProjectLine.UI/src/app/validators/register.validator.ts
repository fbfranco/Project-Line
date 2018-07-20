import { FormGroup } from '@angular/forms';

export class RegistrationValidator {
    static validate(registrationFormGroup: FormGroup) {
        const Password = registrationFormGroup.controls.Password.value;
        const ConfirmPassword = registrationFormGroup.controls.ConfirmPassword.value;

        if (ConfirmPassword.length <= 0) {
            return null;
        }

        if (ConfirmPassword !== Password) {
            return {
                doesMatchPassword: true
            };
        }
        return null;

    }
}
