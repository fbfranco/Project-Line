import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Service
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
// Models
import { User } from '../models/user.model';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Oculto: boolean;
  userFormGroup: FormGroup;
  Token: string;
  isLoginError: boolean;

  constructor(
    private userFormBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userFormGroup = this.userFormBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  submitLogin() {
    this.authService.LoginUser(this.userFormGroup.value)
      .subscribe((data: any) => {
        this.Token = data._body;
        this.userService.getUserByEmail(this.userFormGroup.value.Email).subscribe((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.route.navigate(['Home']);
          localStorage.setItem('userToken', this.Token);
        });
      }, (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

  ChangeStateVariable() {
    this.isLoginError = false;
  }



}
