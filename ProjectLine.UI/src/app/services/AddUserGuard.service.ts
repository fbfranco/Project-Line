import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddUserGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const active = false;
    if (active) {
      return true;
    } else {
      this.router.navigate(['Users']);
    }
  }

}
