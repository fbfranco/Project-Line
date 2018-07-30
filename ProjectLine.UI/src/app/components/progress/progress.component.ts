import { Component, OnInit, Input } from '@angular/core';
import { Phase } from '../../models/phase.model';
import { HelperService } from '../../services/helper.service';

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
  private progressCompleted: number;
  private progressPending: number;

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.startNumbers();
    this.calculateProgress();
    this.showProgressComplete(2);
  }

  startNumbers() {
    this.objectiveNumber = 0;
    this.objectiveCompleted = 0;
    this.progressCompleted = 0;
    this.progressPending = 0;
  }

  calculateProgress() {
    for (const phase in this.phasesProject) {
      if (this.phasesProject.hasOwnProperty(phase)) {
        this.countObjectives(this.phasesProject[phase].Objectives);
      }
    }
    if (this.objectiveNumber > 0) {
      this.progressCompleted = (this.objectiveCompleted * 100) / this.objectiveNumber;
    }
    this.progressPending = 100 - this.progressCompleted;
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

  showProgressComplete(load) {
    $('#progress-circle').empty();
    $('#progress-circle').circliful({
      animation: load,
      animationStep: 5,
      foregroundBorderWidth: 14,
      backgroundBorderWidth: 14,
      fontColor: 'rgb(6, 170, 214)',
      percentageTextSize: 32,
      foregroundColor: 'rgb(6, 170, 214)',
      backgroundColor: 'rgb(80, 80, 80)',
      percent: this.progressCompleted.toFixed(),
    });
  }

  showProgressPending(load) {
    $('#progress-circle').empty();
    $('#progress-circle').circliful({
      animation: load,
      animationStep: 5,
      foregroundBorderWidth: 14,
      backgroundBorderWidth: 14,
      fontColor: 'rgb(211, 131, 12)',
      percentageTextSize: 32,
      foregroundColor: 'rgb(211, 131, 12)',
      backgroundColor: 'rgb(80, 80, 80)',
      percent: this.progressPending.toFixed(),
    });
  }

  sidenavState() {
    const percentage = document.getElementsByClassName('percentage') as HTMLCollectionOf<HTMLElement>;
    const legend = document.getElementsByClassName('legend') as HTMLCollectionOf<HTMLElement>;
    if (percentage.length !== 0) {
      if (this.helperService.SlideMenu.opened) {
        percentage[0].setAttribute('style', 'position: fixed; top:200px; left:240px;');
        legend[0].setAttribute('style', 'position: fixed; top:520px; left:332px;');
      } else {
        percentage[0].setAttribute('style', 'position: fixed; top:200px; left:2px;');
        legend[0].setAttribute('style', 'position: fixed; top:520px; left:92px;');
      }
    }
  }

}
