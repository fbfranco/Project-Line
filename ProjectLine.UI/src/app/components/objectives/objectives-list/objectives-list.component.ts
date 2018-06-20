import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

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

  //List Projects
  ListProjects: Project[];
  ListPhases: Phase[];
  formGroup: FormGroup;
  projectIdNumber: number;
  phaseIdNumber: number;
  binLocationForm: FormGroup;

  // List Objectives
  ListObjectives: Objective[];
  HeaderColumns = ['ObjectiveID', 'Title', 'Description', 'Edit', 'Delete'];

  constructor(public projectService: ProjectService, public phasesServices: PhaseService, private fb: FormBuilder, private dialog: MatDialog, public objectiveServices: ObjectiveService) { }

  //show Item Autocomplete
  displayProjectFn(warehouse): string {
    if (!warehouse) return '';
    console.log(warehouse);
    return warehouse ? warehouse.Title : warehouse;
  }

  displayPhaseFn(warehouseStock): string {
    if (!warehouseStock) return '';
    return warehouseStock ? warehouseStock.Title : warehouseStock;
  }

  //Event Get ProjectID
  projectChanged(event): void {
    this.projectIdNumber = event.option.value.ProjectID;
    console.log("ProjectID: " + this.projectIdNumber);
    //getting service data Phases List
    this.phasesServices.getPhasesList(this.projectIdNumber).subscribe((datalistPhase: Phase[]) => {
      this.ListPhases = datalistPhase;
    }, error => {
      console.log("Error getting the list of Phases");
    });
    console.log(this.ListPhases);
  }

  phaseChanged(event): void {
    this.phaseIdNumber = event.option.value.PhaseID;
    this.newGroup(this.phaseIdNumber);
    console.log("PhaseID: " + this.phaseIdNumber);
    this.objectiveServices.getObjectivesList(this.phaseIdNumber).subscribe((datalistPhase: Objective[]) => {
      this.ListObjectives = datalistPhase;
    }, error => {
      console.log("Error getting the list of Phases");
    });
    console.log(this.ListObjectives);
  }

  ngOnInit() {
    //getting service data Projects List
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ListProjects = datalist;
      console.log(this.ListProjects);
    }, error => {
      console.log("Error getting the list of projects");
    });
    this.binLocationForm = this.fb.group({
      projectIdNumber: '',
      warehouseTitle: ''
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