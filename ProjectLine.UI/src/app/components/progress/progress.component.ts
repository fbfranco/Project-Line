import { Component, OnInit, Input } from '@angular/core';

// Services
import { PhaseService } from '../../services/phase.service';
import { ObjectiveService } from '../../services/objective.service';

// Models
import { Project } from '../../models/project.model';
import { Phase } from '../../models/phase.model';
import { Objective } from '../../models/objective.model';

declare var $: any;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() phasesProject: Phase[];

  private objective: Objective[];

  constructor(
    private phaseService: PhaseService,
    private objectiveService: ObjectiveService
  ) { }

  ngOnInit() {
    this.showProgress();
    console.log(this.phasesProject);
  }

  showProgress() {
    $('#progress-circle').circliful({
      animation: 1,
      animationStep: 5,
      foregroundBorderWidth: 114,
      backgroundBorderWidth: 114,
      foregroundColor: 'rgb(6, 170, 214)',
      backgroundColor: 'rgb(80, 80, 80)',
      replacePercentageByText: '',
      percent: 9,
    });
  }

}
