import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('userActive') !== null) {
      console.log(localStorage.getItem('userActive'));
     this.router.navigate(['/Home']);
      return true;
    } else {
      console.error('This page Bloqued');
      return false;
    }
  }
}
