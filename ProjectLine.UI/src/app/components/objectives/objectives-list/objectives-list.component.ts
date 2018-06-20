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
  wareFaseId: number;
  binLocationForm: FormGroup;

  constructor( public projectService: ProjectService, public phasesServices:PhaseService,private fb: FormBuilder) { }

  //show Item Autocomplete
  displayWarehouseFn(warehouse): string {
    if (!warehouse ) return '';
    console.log(warehouse);
    return warehouse ? warehouse.Title : warehouse;
  }
  displayWarehouseStockFn(warehouseStock): string {
    if (!warehouseStock) return '';
    return warehouseStock ? warehouseStock.Title : warehouseStock;
  }

  //Event Get ProjectID
  warehouseChanged(event): void{
    //get Warehose Stocks for the drop down select
    this.warehouseId = event.option.value.ProjectID;
    console.log("ProjectID: "+this.warehouseId);

    //getting service data Phases List
    this.phasesServices.getPhasesList(this.warehouseId).subscribe((datalistPhase: Phase[])=>{
      this.ListPhases = datalistPhase;        
    },error=>{
      console.log("Error getting the list of Phases");
    });
      console.log(this.ListPhases); 
    
    
  }

  FasewarehouseChanged(event): void{
    //get Warehose Stocks for the drop down select
    this.wareFaseId = event.option.value.PhaseID;
    console.log("PhaseID: "+this.wareFaseId);
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

    this.binLocationForm = this.fb.group({
      warehouseId:'',
      warehouseTitle:''
    });

    

   
    
  }


}
