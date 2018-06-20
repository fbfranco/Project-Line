import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Objective } from '../models/objective.model';

@Injectable({
  providedIn: 'root'
})

export class ObjectiveService {

  private apiURL = 'http://localhost:44226/api/objectives';

  constructor(private http: Http) { }

  createObjective(objective: Objective) {
    const body = JSON.stringify(objective);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(this.apiURL, body, requestOptions);
  }
}
