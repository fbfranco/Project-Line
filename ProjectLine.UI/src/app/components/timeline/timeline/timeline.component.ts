import { Component, OnInit } from '@angular/core';
import { Phase } from '../../../models/phase.model';
import { PhaseService } from '../../../services/phase.service';
declare var $: any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  PhaseModel: Phase[];
  ProjectID: number;

  constructor(private phaseService: PhaseService) {
    this.ProjectID = 2; // set id of project
   }

  ngOnInit() {
    $('.VivaTimeline').vivaTimeline();
    this.displayPhasesOnTimeLine(this.ProjectID);
  }

  displayPhasesOnTimeLine(projectID: number) {
    this.phaseService.getPhasesList(projectID).subscribe((data: Phase[]) => {
      this.PhaseModel = data;
    }, error => {
      console.log('Error getting the list of phases');
    });
  }
}
