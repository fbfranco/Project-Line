import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Objective } from '../models/objective.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ObjectiveService {

  public selectedObjective: Objective;
  private apiURL = 'http://localhost:44226/api/Objectives/';

  constructor(private http: Http) { }

  createObjective(objective: Objective) {
    const body = JSON.stringify(objective);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(`${this.apiURL}PostObjective/`, body, requestOptions);
  }

  updateObjective(objective: Objective) {
    const body = JSON.stringify(objective);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.put(`${this.apiURL}UpdateObjective/`, body, requestOptions);
  }

  deleteObjective(objective: Objective) {
    return this.http.delete(`${this.apiURL}DeleteObjective/${objective.ObjectiveID}`);
  }

  getObjectivesList(PhaseID: number): Observable<Objective[]> {
    return this.http.get(`${this.apiURL}Get/${PhaseID}`).pipe(map((data: Response) => <Objective[]>data.json()));
  }
}
