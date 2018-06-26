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
  ProjectID: 1;

  constructor(private phaseService: PhaseService) {
    // this.PhaseModel = [
    //   {
    //     PhaseID: 1, Title: 'Phase of Develoment', Description: 'This Phase is for develoment of project',
    //     StartDate: new Date, EndDate: new Date, DemoUrl: 'http:://www.demo.com.bo'
    //   },
    //   {
    //     PhaseID: 2, Title: 'Phase of Testing', Description: 'This Phase is for Testing of project',
    //     StartDate: new Date, EndDate: new Date, DemoUrl: 'http:://www.demo.com.bo'
    //   },
    //   {
    //     PhaseID: 3, Title: 'Phase of Mantenimiento', Description: 'This Phase is for Manteniemiento of project',
    //     StartDate: new Date, EndDate: new Date, DemoUrl: 'http:://www.demo.com.bo'
    //   }
    // ];

    // this.PhaseModel = phaseService.getPhasesList(this.ProjectID);
  }

  ngOnInit() {
    // console.table(this.PhaseModel);
    this.phaseService.getPhasesList(2).subscribe((data: Phase[]) => {
      this.PhaseModel = data;
      console.table(this.PhaseModel);
    }, error => {
      console.log('Error getting the list of phases');
    });
  }

}
