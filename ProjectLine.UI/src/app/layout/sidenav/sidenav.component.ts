import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(
    public media: ObservableMedia,
    public helperService: HelperService,
    private router: Router
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
  }

  goRouteLink(url: string) {
    this.router.navigateByUrl('', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

}
