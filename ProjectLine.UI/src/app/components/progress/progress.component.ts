import { Component, OnInit, Input } from '@angular/core';
import { Phase } from '../../models/phase.model';

declare var $: any;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() phasesProject: Phase[];

  private objectiveNumber: number;
  private objectiveCompleted: number;
  private progressPercentage: number;

  constructor() {
    this.objectiveNumber = 0;
    this.objectiveCompleted = 0;
    this.progressPercentage = 0;
  }

  ngOnInit() {
    this.calculateProgress();
  }

  showProgress() {
    $('#progress-circle').circliful({
      animation: 1,
      animationStep: 5,
      foregroundBorderWidth: 114,
      backgroundBorderWidth: 114,
      fontColor: 'rgb(255,255,255)',
      percentageTextSize: 32,
      foregroundColor: 'rgb(6, 170, 214)',
      backgroundColor: 'rgb(80, 80, 80)',
      percent: this.progressPercentage,
    });
  }

  countObjectives(phasesProject) {
    for (const obj in phasesProject) {
      if (phasesProject !== undefined) {
        const element = phasesProject[obj];
        this.objectiveNumber += 1;
        if (element.Completed === true) {
          this.objectiveCompleted += 1;
        }
      }
    }
  }

  calculateProgress() {
    for (const phase in this.phasesProject) {
      if (this.phasesProject.hasOwnProperty(phase)) {
        this.countObjectives(this.phasesProject[phase].Objectives);
      }
    }
    if (this.objectiveNumber > 0) {
      this.progressPercentage = (this.objectiveCompleted * 100) / this.objectiveNumber;
    }
    this.showProgress();
  }

}
