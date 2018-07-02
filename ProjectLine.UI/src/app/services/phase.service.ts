import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Phase } from '../models/phase.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {
  selectedPhase: Phase;
  phaseList: Phase[];
  indexPhase: number;
  private apiURL = 'http://localhost:44226/api/Phases/';

  constructor(private http: Http) { }

  getPhasesList(ProjectID: number): Observable<Phase[]> {
    return this.http.get(`${this.apiURL}Get/${ProjectID}`).pipe(map((data: Response) => <Phase[]>data.json()));
  }
}
