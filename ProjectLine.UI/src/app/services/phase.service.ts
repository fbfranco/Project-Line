import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Phase } from '../models/phase.model';

@Injectable({
	providedIn: 'root'
})
export class PhaseService {

	selectedPhase: Phase;
	phaseList: Phase[];
	constructor(private http: Http) { }

	postPhase(model: Phase) {
		const body = JSON.stringify(model);
		const headerOptions = new Headers({'Content-Type': 'application/json'});
		const requestOptions = new RequestOptions({method : RequestMethod.Post, headers: headerOptions});
		return this.http.post('http://localhost:57135/api/Phases', body, requestOptions);
	}

	getPhaseList() {
		this.http.get('http://localhost:57135/api/Phases')
		.map((data: Response) => {
			return data.json() as Phase[];
		}).toPromise().then(x => {
			this.phaseList = x;
		});
	}

	// putPhase(id, model) {
	// 	const body = JSON.stringify(model);
	// 	const headerOptions = new Headers({ 'Content-Type': 'application/json' });
	// 	const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
	// 	return this.http.put('http://localhost:57135/api/Phases/' + id, body, requestOptions);
	// }

	// deletePhase(id: number) {
	// 	return this.http.delete('http://localhost:57135/api/Phases/' + id);
	// }
}
