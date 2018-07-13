import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public selectedUser: User;
  private apiURL = 'http://localhost:44226/api/Users/';

  constructor(private http: Http) { }

  createUser(user: User) {
    const body = JSON.stringify(user);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(`${this.apiURL}PostUser/`, body, requestOptions);
  }

  updateUser(user: User) {
    const body = JSON.stringify(user);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.put(`${this.apiURL}UpdateUser/`, body, requestOptions);
  }

  deleteUser(user: User) {
    return this.http.delete(`${this.apiURL}DeleteUser/${user.UserID}`);
  }

  getUsersList(): Observable<User[]> {
    return this.http.get(`${this.apiURL}Get/`).pipe(map((data: Response) => <User[]>data.json()));
  }
}
