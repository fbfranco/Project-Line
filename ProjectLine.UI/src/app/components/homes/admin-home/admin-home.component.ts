import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
// services
import { UserService } from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
// model
import { Project } from '../../../models/project.model';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

declare var $: any;
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {


  InitTimeline: boolean;
  ListProjects: Project[];
  RegisteredUsers: number;
  ActiveProject: number;
  ArchivedProject: number;
  objectiveNumber: number;
  objectiveCompleted: number;
  progressPercentage: number;
  progressPending: number;
  RoleID: number;
  UserID: number;
  OwnerID: number;
  OwnerName: string;
  OwnerPhone: string;
  ListPO: User[];

  constructor(
    private userService: UserService,
    private projectService: ProjectService, private router: Router
  ) { }

  ngOnInit() {
    this.InitializeVariables();
    switch (this.RoleID) {
      case 1:
        this.getUserList();
        this.getProjectList();
        this.getArchivedProjectList();
        break;
      case 2:
        this.getProjectListPO();
        this.getArchivedProjectListPO();
        break;
      case 3:
        this.getProjectListCL();
        break;
    }
  }

  getUserList() {
    this.userService.getUsersEdit().subscribe(List => {
      this.RegisteredUsers = List.length;
    }, error => {
      console.log('Error getting the list of Users');
    });
  }
  getProjectList() {
    this.projectService.getProjectsList().subscribe(datalist => {
      this.ListProjects = datalist;
      this.ActiveProject = datalist.length;
      console.log(this.ListProjects);
    }, error => {
      console.log('Error getting the list of projects');
    });
  }
  getProjectListPO() {
    this.projectService.getProjectsListPO(this.UserID).subscribe(List => {
      this.ListProjects = List;
      this.ActiveProject = List.length;
    }, error => {
      console.log('Error getting the list of ProjectsList');
    });
  }
  getProjectListCL() {
    this.projectService.getProjectsListCL(this.UserID).subscribe(List => {
      this.ListProjects = List;
      this.ListProjects.forEach(element => {
        this.OwnerID = element.OwnerID;
      });
      this.getUserPO();
    }, error => {
      console.log('Error getting the list of ProjectsList');
    });
  }
  getUserPO() {
    this.userService.getUserPO(this.OwnerID).subscribe(List => {
      this.ListPO = List;
      this.ListPO.forEach(element => {
        this.OwnerName = element.FirstName;
        this.OwnerPhone = element.Mobile;
      });
    }, error => {
      console.log('Error getting the list of ProjectsList');
    });
  }
  getArchivedProjectList() {
    this.projectService.getArchivedProjectsList().subscribe(List => {
      this.ArchivedProject = List.length;
    }, error => {
      console.log('Error getting the list of ProjectsList');
    });
  }
  getArchivedProjectListPO() {
    this.projectService.getArchivedProjectsListPO(this.UserID).subscribe(List => {
      this.ArchivedProject = List.length;
    }, error => {
      console.log('Error getting the list of ProjectsList');
    });
  }
  InitializeVariables() {
    this.RoleID = 1;
    this.UserID = 1;
    this.ActiveProject = 0;
    this.RegisteredUsers = 0;
    this.ArchivedProject = 0;
    this.objectiveNumber = 0;
    this.objectiveCompleted = 0;
    this.progressPercentage = 0;
    this.progressPending = 0;
    this.OwnerName = '';
    this.OwnerPhone = '';
  }
  calculateProgress(project: Project) {
    this.resetNumbers();
    for (const phase in project.Phases) {
      if (project.Phases.hasOwnProperty(phase)) {
        this.countObjectives(project.Phases[phase].Objectives);
      }
    }
    if (this.objectiveNumber > 0) {
      this.progressPercentage = (this.objectiveCompleted * 100) / this.objectiveNumber;
    }
    return Math.round(this.progressPercentage);
  }

  countObjectives(phasesProject) {
    for (const obj in phasesProject) {
      if (phasesProject !== undefined) {
        const element = phasesProject[obj];
        this.objectiveNumber += 1;
        if (element.Completed === true) {
          this.objectiveCompleted += 1;
        }
      }
    }
  }
  resetNumbers() {
    this.objectiveNumber = 0;
    this.objectiveCompleted = 0;
    this.progressPercentage = 0;
  }
  goRouteLink(project: Project) {
    this.projectService.selectedProjectHome = project;
    this.router.navigate(['ProjectTracking']);
  }
  goListClients() {
    this.router.navigate(['Users']);
  }
  goListProjects() {
    this.router.navigate(['Projects']);
  }
}
