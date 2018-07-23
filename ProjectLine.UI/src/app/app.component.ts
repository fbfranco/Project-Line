import { Component } from '@angular/core';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    public helper: HelperService
  ) {
    helper.Ocultar = false;
    helper.HideLayout = false;
  }
}
