import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  public selectedRol: Rol;
  private apiURL = 'http://localhost:44226/api/Rols/';
  constructor(private http: Http) { }

  getRolesList(): Observable<Rol[]> {
    return this.http.get(`${this.apiURL}GetRols/`).pipe(map((data: Response) => <Rol[]>data.json()));
  }
  getRolList(RoleId: number): Observable<Rol[]> {
    return this.http.get(`${this.apiURL}GetRol/${RoleId}`).pipe(map((data: Response) => <Rol[]>data.json()));
  }
}
