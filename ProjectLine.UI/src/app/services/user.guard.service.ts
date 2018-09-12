import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// Services
import { AuthService } from './auth.service';

@Injectable()
export class UserGuard implements CanActivate {
    RoleID: number;
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.decodeJWT(localStorage.getItem('userToken'));
    }

    canActivate() {
        if (this.RoleID === 1) {
            return true;
        } else {
            this.router.navigate(['Home']);
        }
    }

    decodeJWT(token: string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const data = JSON.parse(window.atob(base64));
            this.RoleID = Number(data.role_id);
        } catch (error) {
            this.RoleID = null;
        }
    }
}
