import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
// Service
import { PermissionsService } from '../../services/permissions.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public media: ObservableMedia,
    public helperService: HelperService,
    private permissionsService: PermissionsService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  SideNavToggle() {
    this.helperService.SlideMenu.toggle();
  }
  sidenavState() {
    const percentage = document.getElementsByClassName('percentage') as HTMLCollectionOf<HTMLElement>;
    const legend = document.getElementsByClassName('legend') as HTMLCollectionOf<HTMLElement>;
    if (percentage.length !== 0) {
      if (this.helperService.SlideMenu.opened) {
        percentage[0].setAttribute('style', 'position: fixed; top:200px; left:240px;');
        legend[0].setAttribute('style', 'position: fixed; top:520px; left:332px;');
      } else {
        percentage[0].setAttribute('style', 'position: fixed; top:200px; left:2px;');
        legend[0].setAttribute('style', 'position: fixed; top:520px; left:92px;');
      }
    }
  }
  GoStart() {
    // this.helperService.HideLayout = false;
    localStorage.clear();
    // this.permissionsService.UserPermissions = [];
    this.router.navigate(['/']);
  }
}
