import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// Service
import { HelperService } from '../services/helper.service';
import { PermissionsService } from '../services/permissions.service';
import { RolService } from '../services/rol.service';
// Models
import { Permissions } from '../models/Permissions.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Oculto: boolean;
  userFormGroup: FormGroup;

  constructor(
    public helper: HelperService,
    private userFormBuilder: FormBuilder,
    private route: Router,
    private permissionService: PermissionsService,
  ) { }

  ngOnInit() {
    this.userFormGroup = this.userFormBuilder.group({
      Username: '',
      Password: ''
    });
  }

  submitLogin() {
    this.helper.HideLayout = true;
    this.permissionService.getUserPermissions(1);
    console.log(this.permissionService.UserPermissions);
    this.route.navigate(['/Home']);
  }

}
