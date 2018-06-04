
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';



import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  selectedClient: Client;
  clientList: Client[];
  constructor(private http: Http) { }

  postClient(model: Client) {
    const body = JSON.stringify(model);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method : RequestMethod.Post, headers: headerOptions});
    return this.http.post('http://localhost:57135/api/Clients', body, requestOptions);
  }

  putClient(id, model) {
    const body = JSON.stringify(model);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:57135/api/Clients/' + id, body, requestOptions);
  }

  getClientList() {
    this.http.get('http://localhost:57135/api/Clients').pipe(
    map((data: Response) => {
      return data.json() as Client[];
    })).toPromise().then(x => {
      this.clientList = x;
    });
  }

  deleteClient(id: number) {
    return this.http.delete('http://localhost:57135/api/Clients/' + id);
  }
}
