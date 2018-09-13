import { Component } from '@angular/core';
import { HelperService } from './services/helper.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    public helper: HelperService,
    private tokenService: TokenService
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
