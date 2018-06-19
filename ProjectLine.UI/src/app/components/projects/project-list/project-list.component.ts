// Config
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
// Services
import { ProjectService } from '../../../services/project.service';
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
  HeaderColumns = ['ProjectID', 'Title', 'Description', 'StartDate', 'EndDate', 'Edit', 'Delete'];

  constructor( public projectService: ProjectService) { }

  ngOnInit() {
    // getting service data
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }
}
