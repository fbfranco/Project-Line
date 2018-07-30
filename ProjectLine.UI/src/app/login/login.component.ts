import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Oculto: boolean;
  constructor(
    public helper: HelperService,
    private userFormBuilder: FormBuilder,
  ) { }
  userFormGroup: FormGroup;

  ngOnInit() {
    this.userFormGroup = this.userFormBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }
  submitLogin() {
    this.helper.HideLayout = true;
  }

}
