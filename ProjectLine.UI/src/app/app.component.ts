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
  }

  TokenActive(): boolean {
    let active = true;
    if (localStorage.getItem('userToken') === null) {
      active = false;
    }
    return active;
  }

}
