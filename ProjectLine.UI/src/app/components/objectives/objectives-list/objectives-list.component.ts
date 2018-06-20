import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
//Services
import { ProjectService } from "../../../services/project.service";
import { PhaseService } from "../../../services/phase.service";
import { ObjectiveService } from "../../../services/objective.service";

// Models
import { Project } from "../../../models/project.model";
import { Phase } from "../../../models/phase.model";
import { Objective } from "../../../models/objective.model";
import { ObjectiveAddComponent } from '../objective-add/objective-add.component';


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

  formGroup: FormGroup;
  phaseIdNumber: number;

  warehouseId: number;
  wareFaseId: number;
  binLocationForm: FormGroup;

    // List Projects
    ListObjectives: Objective[];
    HeaderColumns = ['ObjectiveID', 'Title', 'Description','Edit', 'Delete'];

  constructor( public projectService: ProjectService, public phasesServices:PhaseService,private fb: FormBuilder, private dialog: MatDialog,public objectiveServices: ObjectiveService) { }

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

    this.phaseIdNumber = event.option.value.PhaseID;
    this.newGroup(this.phaseIdNumber);
    console.log("PhaseID: "+this.phaseIdNumber);

    //getting service data ObjectivesList
    this.objectiveServices.getObjectivesList(this.wareFaseId).subscribe((datalistPhase: Objective[])=>{
      this.ListObjectives = datalistPhase;        
    },error=>{
      console.log("Error getting the list of Phases");
    });
      console.log(this.ListObjectives); 
    
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

    this.newGroup('');

  }

  newGroup(val): void {
    this.formGroup = this.fb.group({
      id: val
    });
  }


  openDialog() {
    if (this.phaseIdNumber > 0) {
      const dialogRef = this.dialog.open(ObjectiveAddComponent, {
        data: this.phaseIdNumber
      });
    }
  }


}
