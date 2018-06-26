import { Component, OnInit } from '@angular/core';
import { Phase } from '../../models/phase.model';
import { PhaseService } from '../../services/phase.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  PhaseModel: Phase[];
  PhaseLocal: Phase[];
  ProjectID: number;
  Sw: boolean;

  constructor(private phaseService: PhaseService) {
    this.ProjectID = 1;
    this.Sw = true;
    this.PhaseLocal = [
      {
        PhaseID: 1, Title: 'Phase of Develoment', Description: 'This Phase is for develoment of project',
        StartDate: new Date, EndDate: new Date, DemoUrl: 'http:://www.demo.com.bo'
      },
      {
        PhaseID: 2, Title: 'Phase of Testing', Description: 'This Phase is for Testing of project',
        StartDate: new Date, EndDate: new Date, DemoUrl: 'http:://www.demo.com.bo'
      },
      {
        PhaseID: 3, Title: 'Phase of Mantenimiento', Description: 'This Phase is for Manteniemiento of project',
        StartDate: new Date, EndDate: new Date, DemoUrl: 'http:://www.demo.com.bo'
      }
    ];

    // this.PhaseLocal = phaseService.getPhasesList(this.ProjectID);
  }
  ngOnInit() {
    this.displayPhasesOnTimeLine(this.ProjectID);
  }

  displayPhasesOnTimeLine(projectID: number) {
    this.phaseService.getPhasesList(projectID).subscribe((data: Phase[]) => {
      this.PhaseModel = data;
      console.table(this.PhaseModel);
    }, error => {
      console.log('Error getting the list of phases');
    });
  }

}
