import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  @ViewChild('sidenav') sideNav: MatSidenav;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  constructor (media:  ObservableMedia) {
    media.asObservable()
     .pipe(
        filter((change: MediaChange) => change.mqAlias  ===  'xs')
     ).subscribe (() =>  this.sideNav.close());
    media.asObservable()
     .pipe(
        filter((change: MediaChange) => change.mqAlias  ===  'sm')
     ).subscribe (() =>  this.sideNav.open());
}

  ngOnInit() {
  }

}
