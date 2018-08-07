import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
// Services
import { HelperService } from '../../services/helper.service';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') public sideNav: MatSidenav;

  public userName: string;

  constructor(
    public media: ObservableMedia,
    public helperService: HelperService,
    private router: Router,
    private roleService: RolService
  ) {
    media.asObservable()
      .pipe(
        filter((change: MediaChange) => change.mqAlias === 'xs')
      ).subscribe(() => this.sideNav.close());
    media.asObservable()
      .pipe(
        filter((change: MediaChange) => change.mqAlias === 'sm')
      ).subscribe(() => this.sideNav.open());
  }

  ngOnInit() {
    this.helperService.SlideMenu = this.sideNav;
    this.userName = this.roleService.userActive.Email;
  }

  goRouteLink(url: string) {
    this.router.navigateByUrl('', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  // Roles and Permissions

  verifyPermission(value: string): boolean {
    const permissions: string[] = this.roleService.permissions;
    let permit = false;
    if (permissions.length > 0) {
      permissions.forEach(permission => {
        if (permission === value) {
          permit = true;
        }
      });
      return permit;
    }
  }

  GoStart() {
    console.log('Action');
    localStorage.clear();
    this.roleService.permissions = [];
    this.router.navigate(['/']);
  }
}
