import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.VivaTimeline').vivaTimeline();
  }
  

}
