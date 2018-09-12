import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AddUserGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    let active = false;
    this.authService.permissions.forEach(permission => {
      if (permission === 'User_Add') {
        active = true;
      }
    });
    if (active) {
      return true;
    } else {
      this.router.navigate(['Users']);
    }
  }

}
