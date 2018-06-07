import { Component, OnInit } from '@angular/core';

//Add import by Dev-Sebastian
import { PhaseService } from '../../services/phase.service';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styles: [],
  //Add provider by Dev-Sebastian
  providers: [PhaseService]
})

export class PhasesComponent implements OnInit {

  //Edit constructor by Dev-Sebastian
  constructor(public phaseService: PhaseService) { }

  ngOnInit() {
  }
}