import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

// Services
import { ProjectService } from '../../../services/project.service';
// Models
import { Project } from '../../../models/project.model';

declare var $:any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

    // List Projects
    ListProjects: Project[];
    projectIdNumber: number;
    EndDate: string;
    StartDate: string;
    Hide : boolean;
    values = '';
    

  constructor(public projectService: ProjectService) { }

  ngOnInit() {
    $('.VivaTimeline').vivaTimeline();
    this.getProjectList()
    this.Hide = false;
  }

  // show Item Autocomplete
  displayProjectFn(project): string {
    if (!project) { return ''; }
    return project ? project.Title : project;
  }

  //Get the dates of the selected project
  projectChanged(event): void{
    this.EndDate = event.option.value.EndDate;
    this.StartDate = event.option.value.StartDate;
    this.Hide = true;
    console.log("EndDate: "+this.EndDate+" StarDate: "+this.StartDate);
  }


  getProjectList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
    this.ListProjects = datalist;
    console.log(this.ListProjects);
    }, error => {
      console.log('Error getting the list of projects');
    });
    
  }

  inputEmpty(event: any){
     if (event != '' ) {
      this.Hide = false;
      console.log(this.StartDate);
     }    
      
    
  }
  

}
