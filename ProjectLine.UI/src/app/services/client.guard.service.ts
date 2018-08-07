import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// Services
import { RolService } from './rol.service';

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(
        private router: Router,
        private roleService: RolService
    ) { }

    canActivate() {
        let active = false;
        this.roleService.permissions.forEach(permission => {
            if (permission === 'Project_View') {
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
