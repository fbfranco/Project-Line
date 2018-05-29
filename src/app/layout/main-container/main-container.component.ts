import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators/filter';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  @ViewChild('sidenav') sideNav: MatSidenav;
  constructor (media:  ObservableMedia) {
    media.asObservable()
     .pipe(
        filter((change: MediaChange) => change.mqAlias  ===  'sm' )
     ).subscribe (() =>  this.sideNav.toggle());
}

  ngOnInit() {
  }

}
