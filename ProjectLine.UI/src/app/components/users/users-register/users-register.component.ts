import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegistrationValidator } from '../../shared/register.validator';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent implements OnInit {

  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required, RegistrationValidator]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
    this.registrationFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
   }

  ngOnInit() {
  }

  onClickRegister() {

  }
}
