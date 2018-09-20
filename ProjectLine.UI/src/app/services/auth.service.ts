import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Navigation variables
  public UserID: number;
  public RoleID: number;
  public Email: string;
  public permissions: string[] = [];

  private apiURL = 'http://www.projectline.somee.com/api/Login/';

  constructor(private http: Http) { }

  LoginUser(user: any) {
    const body = JSON.stringify(user);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(`${this.apiURL}Authenticate/`, body, requestOptions);
  }
}
