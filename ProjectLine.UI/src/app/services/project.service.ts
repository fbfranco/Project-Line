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

  constructor(private http: Http) { }

  postProject(model: ViewModelProject) {
    const body = JSON.stringify(model);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:44226/api/Projects/SaveProject', body, requestOptions);
  }

  putProject(model: ViewModelProject) {
    const body = JSON.stringify(model);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.put(`http://localhost:44226/api/Projects/UpdateProjectAndPhases/${model.Project.ProjectID}`, body, requestOptions);
  }

  getProjectsList(): Observable<Project[]> {
    return this.http.get('http://localhost:44226/api/Projects/GetProjects/').pipe(map((data: Response) => <Project[]>data.json()));
  }

  putProjectDeletePasive(id) {
    //const body = JSON.stringify(model);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:44226/api/Projects/Change/' + id, requestOptions);
    
  }
}
