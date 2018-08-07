import { Component, OnInit } from '@angular/core';
// Services
import { RolService } from '../services/rol.service';
// Models
import { Permissions } from '../models/Permissions.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private roleService: RolService) { }
  ngOnInit() {
    this.getUserActive();
    this.getUserPermissions(this.roleService.userActive.RoleID);
  }

  getUserActive() {
    this.roleService.userActive = JSON.parse(localStorage.getItem('user'));
  }

  getUserPermissions(rolID: number) {
    this.roleService.getPermissionsByRole(rolID).subscribe((List: Permissions[]) => {
      if (List !== null) {
        List.forEach(p => {
          this.roleService.permissions.push(p.Name);
        });
      } else {
        console.error('No exist roles for this user');
      }
    }, error => {
      console.log('Acces invalid');
    });
  }

}
