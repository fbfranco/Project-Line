import { Injectable } from '@angular/core';
import { RolService } from './rol.service';
import { Permissions } from '../models/Permissions.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  // UserPermissions: string[] = [];
  constructor(private roleService: RolService) { }

  // public verifyPermission(PermissionsName: string): boolean {
  //   if (this.UserPermissions.length > 0) {
  //     return this.UserPermissions.includes(PermissionsName);
  //   } else {
  //     console.error('No exist permissions for this user');
  //     return false;
  //   }
  // }
}
