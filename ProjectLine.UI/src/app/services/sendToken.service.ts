import { Injectable } from '@angular/core';
import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';

const AUTHORIZATION_HEADER = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class SendTokenService extends BaseRequestOptions {
  constructor() {
    super();
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    if (localStorage.getItem('userToken') !== null) {
      this.headers.delete(AUTHORIZATION_HEADER);
      this.headers.append(AUTHORIZATION_HEADER, 'Bearer ' + localStorage.getItem('userToken'));
    } else {
      this.headers.delete(AUTHORIZATION_HEADER);
    }
    return super.merge(options);
  }
}
