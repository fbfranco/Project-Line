// Config
import { Component, OnInit } from '@angular/core';
// Services
import { ProjectService } from '../../../services/project.service';
import { PhaseService } from '../../../services/phase.service';
// Models
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  // List Projects
  ListProjects: Project[];
  HeaderColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];

  constructor( public projectService: ProjectService,
               private phasesService: PhaseService) { }

  ngOnInit() {
    // getting service data
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }

  newProject() {
    this.phasesService.phaseList = [];
    this.projectService.selectedProject = new Project();
    this.projectService.selectedProject.StartDate = new Date();
    this.projectService.selectedProject.EndDate = new Date();
  }

  getSelectedProject(project: Project) {
    this.projectService.selectedProject = Object.assign({}, project);
    this.phasesService.phaseList = this.projectService.selectedProject.Phases;
  }

  DeletePasive(id) {
    if (confirm('Surely you want to eliminate this phase?')) {
      this.projectService.putProjectDeletePasive(id)
    .subscribe(data => {
     this.projectService.getProjectsList().subscribe((datalist: Project[])=>{
      this.ListProjects = datalist;})
    }); 
  }      
}
}
