import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();

  constructor() {}

  ngOnInit() {
  }
}
