import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
// Service
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Oculto: boolean;
  userFormGroup: FormGroup;
  isLoginError: boolean;
  loading: boolean;
  hide = true;

  constructor(
    private userFormBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
  ) {
    this.loading = false;
   }

  ngOnInit() {
    this.userFormGroup = this.userFormBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  submitLogin() {
    this.loading = true;
    this.authService.LoginUser(this.userFormGroup.value)
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data._body);
        this.route.navigate(['Home']);
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.isLoginError = true;
      });
  }

  ChangeStateVariable() {
    this.isLoginError = false;
  }

}
