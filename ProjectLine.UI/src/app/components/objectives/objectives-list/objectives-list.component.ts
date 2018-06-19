import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
//Services
import { ProjectService } from "../../../services/project.service";
import { PhaseService } from "../../../services/phase.service";
// Models
import { Project } from "../../../models/project.model";
import { Phase } from "../../../models/phase.model";


@Component({
  selector: 'app-objectives-list',
  templateUrl: './objectives-list.component.html',
  styleUrls: ['./objectives-list.component.scss']
})

export class ObjectivesListComponent implements OnInit {
  //myControl: FormControl = new FormControl();

  //List Projects
  ListProjects : Project[];
  ListPhases: Phase[];

  
  warehouseId: number;

  constructor( public projectService: ProjectService, public phasesServices:PhaseService) { }

  //show Item Autocomplete
  displayWarehouseFn(warehouse): string {
    if (!warehouse ) return '';
    console.log(warehouse);
    return warehouse ? warehouse.Title : warehouse;
  }

  //Event Get ProjectID
  warehouseChanged(event): void{
    //get Warehose Stocks for the drop down select
    this.warehouseId = event.option.value.ProjectID;
    console.log("ProjectID: "+this.warehouseId);
    
  }

  ngOnInit() 
  {  
    //getting service data Projects List
    this.projectService.getProjectsList().subscribe((datalist: Project[])=>{
      this.ListProjects = datalist;
      console.log(this.ListProjects);
    },error=>{
      console.log("Error getting the list of projects");
    });

      //getting service data Phases List
      console.log(this.ListPhases);
      this.phasesServices.getPhasesList(this.warehouseId).subscribe((datalistPhase: Phase[])=>{
        this.ListPhases = datalistPhase;
        
      },error=>{
        console.log("Error getting the list of Phases");
      });
    
  }


}
