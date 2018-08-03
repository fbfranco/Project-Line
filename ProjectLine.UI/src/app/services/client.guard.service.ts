import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }

    canActivate() {
        const permissions: string[] = JSON.parse(localStorage.getItem('Permissions'));
        if (permissions.includes('Project_View')) {
            return true;
        } else {
            this.router.navigate(['Home']);
        }
    }
}
