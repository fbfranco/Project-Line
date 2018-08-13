import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
// Services
import { RolService } from '../services/rol.service';
import { AuthService } from '../services/auth.service';
// Models
import { Permissions } from '../models/Permissions.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(
    private roleService: RolService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.decodeJWT(localStorage.getItem('userToken'));
    this.getUserPermissions(this.authService.RoleID);
  }

  decodeJWT(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const data = JSON.parse(window.atob(base64));
      // Initializing navigation variables
      this.authService.UserID = Number(data.user_id);
      this.authService.RoleID = Number(data.role_id);
      this.authService.Email = data.unique_name;
    } catch (error) {
      console.log(error);
      localStorage.clear();
      this.authService.permissions = [];
      this.router.navigate(['/']);
    }
  }

  getUserPermissions(rolID: number) {
    this.roleService.getPermissionsByRole(rolID).subscribe((List: Permissions[]) => {
      if (List !== null) {
        List.forEach(p => {
          this.authService.permissions.push(p.Name);
        });
      } else {
        console.error('No exist roles for this user');
      }
    }, error => {
      console.log('Acces invalid');
    });
  }

}
