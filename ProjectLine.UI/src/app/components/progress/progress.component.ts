import { Component, OnInit, Input } from '@angular/core';

// Services
import { PhaseService } from '../../services/phase.service';
import { ObjectiveService } from '../../services/objective.service';

// Models
import { Phase } from '../../models/phase.model';
import { Objective } from '../../models/objective.model';

declare var $: any;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() projectIdNumber: number;

  constructor(
    private phaseService: PhaseService,
    private objectiveService: ObjectiveService
  ) { }

  ngOnInit() {
    this.showProgress();
  }

  showProgress() {
    $('#progress-circle').circliful({
      animation: 1,
      animationStep: 5,
      foregroundBorderWidth: 15,
      backgroundBorderWidth: 15,
      foregroundColor: 'rgb(6, 170, 214)',
      percentageTextSize: 32,
      percent: 50,
    });
  }

}
