import { Component, OnInit } from '@angular/core';
// services
import { UserService } from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
// model
import { Project } from '../../../models/project.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {


  ListProjects: Project[];
  RegisteredUsers: number;
  ActiveProject: number;
  ArchivedProject: number;
  objectiveNumber: number;
  objectiveCompleted: number;
  progressPercentage: number;

  constructor(
    private userService: UserService,
    private projectService: ProjectService, private router: Router
  ) { }

  ngOnInit() {
    this.ActiveProject = 0;
    this.RegisteredUsers = 0;
    this.ArchivedProject = 0;
    this.objectiveNumber = 0;
    this.objectiveCompleted = 0;
    this.progressPercentage = 0;
    this.getUserList();
    this.getProjectList();
    this.getArchivedProjectList();
  }
  getUserList() {
    this.userService.getUsersList().subscribe(List => {
      this.RegisteredUsers = List.length;
    }, error => {
      console.log('Error getting the list of Users');
    });
  }

  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
      this.ActiveProject = datalist.length;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }
  getArchivedProjectList() {
    this.projectService.getArchivedProjectsList().subscribe(List => {
      this.ArchivedProject = List.length;
    }, error => {
      console.log('Error getting the list of Users');
    });
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
    return this.progressPercentage;
  }
  resetNumbers() {
    this.objectiveNumber = 0;
    this.objectiveCompleted = 0;
    this.progressPercentage = 0;
  }
  goRouteLink(project: Project) {
    this.projectService.selectedProject = project;
    this.router.navigate(['ProjectTracking']);
  }

}
