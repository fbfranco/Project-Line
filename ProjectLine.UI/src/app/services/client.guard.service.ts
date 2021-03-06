import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// Services
import { AuthService } from './auth.service';

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        let active = false;
        this.authService.permissions.forEach(permission => {
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
