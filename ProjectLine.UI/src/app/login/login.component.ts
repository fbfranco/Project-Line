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
    // private permissionService: PermissionsService,
    private roleService: RolService
  ) { }

  ngOnInit() {
    this.userFormGroup = this.userFormBuilder.group({
      Username: '',
      Password: ''
    });
  }

  submitLogin() {
    const RolID = 2; // User Role Id
    const permissions: string[] = [];
    this.roleService.getPermissionsByRole(RolID).subscribe((List: Permissions[]) => {
      if (List !== null) {
        List.forEach(p => {
          permissions.push(p.Name);
        });
        // this.helper.HideLayout = true;
        localStorage.setItem('Active', 'true');
        localStorage.setItem('Permissions', JSON.stringify(permissions));
        console.log(JSON.parse(localStorage.getItem('Permissions')));
        this.route.navigate(['/Home']);
      } else {
        console.error('No exist roles for this user');
      }
    });
  }



}
