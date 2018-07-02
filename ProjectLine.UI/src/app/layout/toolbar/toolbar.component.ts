import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public media:  ObservableMedia, public helperService: HelperService) { }

  ngOnInit() {
  }

  SideNavToggle() {
    this.helperService.SlideMenu.toggle();
  }
}
