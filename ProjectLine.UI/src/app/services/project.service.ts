import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { ViewModelProject } from '../models/viewmodelproject.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  selectedProject: Project;
  projectList: Project[];
  private apiURL = 'http://localhost:44226/api/Projects/';

  constructor(private http: Http) { }

  postProject(model: Project) {
    const body = JSON.stringify(model);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(`${this.apiURL}SaveProject`, body, requestOptions);
  }

  putProject(model: Project) {
    const body = JSON.stringify(model);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.put(`${this.apiURL}UpdateProjectAndPhases/${model.ProjectID}`, body, requestOptions);
  }

  getProjectsList(): Observable<Project[]> {
    return this.http.get(`${this.apiURL}GetProjects/`).pipe(map((data: Response) => <Project[]>data.json()));
  }

  putProjectDeletePasive(id) {
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(`${this.apiURL}InactiveProject/${id}`, requestOptions);
  }
}
