import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
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
  sidenavMode: string;
  sidenavHide: boolean;

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

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenavMode = 'over';
      this.sidenavHide = true;
    } else {
      this.sidenavMode = 'side';
      this.sidenavHide = false;
    }
  }

  onStart() {
    if (window.innerWidth < 768) {
      this.sidenavMode = 'over';
      this.sidenavHide = true;
      this.sideNav.close();
    } else {
      this.sidenavMode = 'side';
      this.sidenavHide = false;
      this.sideNav.open();
    }
  }

  ngOnInit() {
    this.helperService.SlideMenu = this.sideNav;
    this.userName = this.roleService.userActive.Email;
    this.onStart();
  }

  goRouteLink(url: string, reload: boolean) {
    if (this.sidenavHide) {
      this.sideNav.close();
    }
    if (reload) {
      this.router.navigateByUrl('', { skipLocationChange: true })
        .then(() => this.router.navigate([url]));
    } else {
      this.router.navigate([url]);
    }
    document.getElementById('menu').blur();
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
