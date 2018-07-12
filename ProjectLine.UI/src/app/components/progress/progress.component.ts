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
  }

  ngOnInit() {
    this.resetNumbers();
    this.showProgress('rgb(80, 80, 80)');
  }

  resetNumbers() {
    this.objectiveNumber = 0;
    this.objectiveCompleted = 0;
    this.progressPercentage = 0;
  }

  showProgress(color) {
    if (color === 'rgb(80, 80, 80)') {
      $('#progress-circle').circliful({
        backgroundBorderWidth: 14,
        replacePercentageByText: '',
        backgroundColor: 'rgb(80, 80, 80)',
        percent: this.progressPercentage,
      });
    } else {
      $('#progress-circle').empty();
      $('#progress-circle').circliful({
        animation: 1,
        animationStep: 5,
        foregroundBorderWidth: 14,
        backgroundBorderWidth: 14,
        fontColor: color,
        percentageTextSize: 32,
        foregroundColor: color,
        backgroundColor: 'rgb(80, 80, 80)',
        percent: this.progressPercentage,
      });
    }
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

  calculateProgress(val) {
    this.resetNumbers();
    for (const phase in this.phasesProject) {
      if (this.phasesProject.hasOwnProperty(phase)) {
        this.countObjectives(this.phasesProject[phase].Objectives);
      }
    }
    if (this.objectiveNumber > 0) {
      this.progressPercentage = (this.objectiveCompleted * 100) / this.objectiveNumber;
    }
    if (val === 1) {
      this.showProgress('rgb(6, 170, 214)');
    } else {
      this.progressPercentage = 100 - this.progressPercentage;
      this.showProgress('rgb(211, 131, 12)');
    }
  }

}
