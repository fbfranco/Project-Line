import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
// Services
import { HelperService } from '../../services/helper.service';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
// Models
import { Project } from '../../models/project.model';

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
  ListProject: Project[];
  optionsProjects: string[] = [];
  UserID: number;
  RoleID: number;

  constructor(
    public media: ObservableMedia,
    public helperService: HelperService,
    private router: Router,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private authService: AuthService
  ) { }
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    if (event.target.innerWidth <= 800) {
      this.sidenavMode = 'over';
      this.sidenavHide = true;
      if (this.sideNav.opened) {
        this.sideNav.close();
      }
    } else {
      this.sidenavMode = 'side';
      this.sidenavHide = false;
      if (!this.sideNav.opened) {
        this.sideNav.open();
      }
    }
  }

  onStart() {
    if (window.innerWidth <= 800) {
      this.sidenavMode = 'over';
      this.sidenavHide = true;
    } else {
      this.sidenavMode = 'side';
      this.sidenavHide = false;
      this.sideNav.open();
    }
  }

  ngOnInit() {
    this.UserID = this.authService.UserID;
    this.RoleID = this.authService.RoleID;
    this.getProjectList();
    this.helperService.SlideMenu = this.sideNav;
    this.userName = this.authService.Email;
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
    document.getElementById('buttonMenu').blur();
    this.snackBar.dismiss();
  }

  verifyPermission(value: string): boolean {
    const permissions: string[] = this.authService.permissions;
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
    localStorage.clear();
    this.authService.permissions = [];
    this.router.navigate(['/']);
  }

  setOptionsProject() {
    for (let index = 0; index < this.ListProject.length; index++) {
      const element = this.ListProject[index];
      this.optionsProjects.push(element.Title);
    }
  }
  getProjectList() {
    this.projectService.getProjectsListCL(this.UserID).subscribe((datalistProject: Project[]) => {
      this.ListProject = datalistProject;
      this.setOptionsProject();
    }, error => {
      console.log('Error getting the list of Phases');
    });
  }

  goRouteProjects(project: Project) {
    this.projectService.selectedProjectHome = project;
    this.router.navigate(['/']).then(() => { this.router.navigate(['ProjectTracking'] ); });
  }

}
