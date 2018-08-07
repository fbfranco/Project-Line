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

  deleteUser(id: number) {
    return this.http.delete(`${this.apiURL}DeleteUser/${id}`);
  }

  getUsersList(): Observable<User[]> {
    return this.http.get(`${this.apiURL}Get/`).pipe(map((data: Response) => <User[]>data.json()));
  }
  getUserPO(OwnerID: number): Observable<User[]> {
    return this.http.get(`${this.apiURL}GetUserPO/${OwnerID}`).pipe(map((data: Response) => <User[]>data.json()));
  }

  getUsersEdit(): Observable<User[]> {
    return this.http.get(`${this.apiURL}GetUserEdit/`).pipe(map((data: Response) => <User[]>data.json()));
  }

  getUsersByRol(idRol): Observable<User[]> {
    return this.http.get(`${this.apiURL}GetUsersByRol/${idRol}`).pipe(map((data: Response) => <User[]>data.json()));
  }

  validateEmailUnique(email: string, id: number): Observable<boolean> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.apiURL}ValidateEmailUnique?email=${email}&id=${id}`).pipe(map((data: Response) => <boolean>data.json()));
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`${this.apiURL}getUserByEmail?email=${email}`).pipe(map((data: Response) => <User>data.json()));
  }
}
