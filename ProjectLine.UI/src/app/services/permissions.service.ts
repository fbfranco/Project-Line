import { Injectable } from '@angular/core';
import { RolService } from './rol.service';
import { Permissions } from '../models/Permissions.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  UserPermissions: string[] = [];
  constructor(private roleService: RolService) { }

  public getUserPermissions(RoleID: number): void {
    this.roleService.getPermissionsByRole(RoleID).subscribe((List: Permissions[]) => {
      List.forEach(p => {
        this.UserPermissions.push(p.Name);
      });
    }, error => {
      console.log('Error getting the list of Permissions');
    });
  }

  public verifyPermission(PermissionsName: string): Boolean {
    console.log(this.UserPermissions);
    if (this.UserPermissions.length > 0) {
      return this.UserPermissions.includes(PermissionsName);
    } else {
      console.error('No exist permissions for this user');
      return false;
    }
  }
}
