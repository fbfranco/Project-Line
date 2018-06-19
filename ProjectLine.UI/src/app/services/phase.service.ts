import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Phase } from '../models/phase.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {
  selectedPhase: Phase;
  phaseList: Phase[];
  constructor(private http: Http) { }

  postPhase(model: Phase) {
    const body = JSON.stringify(model);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      headers: headerOptions
    });
    return this.http.post(
      'http://localhost:44226/api/Phases',
      body,
      requestOptions
    );
  }

  getPhaseList(): Observable<Phase[]> {
    return this.http.get('http://localhost:44226/api/Phases').pipe(map((data: Response) => <Phase[]>data.json()));
  }
}
