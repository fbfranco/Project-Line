import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RolService } from './rol.service';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private router: Router,
        private roleService: RolService
    ) { }

    canActivate() {
        let active = false;
        this.roleService.permissions.forEach(permission => {
            if (permission === 'User_View') {
                active = true;
            }
        });
        if (active) {
            return true;
        } else {
            this.router.navigate(['/']);
        }
    }
}
