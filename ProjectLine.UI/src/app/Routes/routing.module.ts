import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from '../components/clients/client/client.component';
import { ProjectListComponent } from '../components/projects/project-list/project-list.component';
import { ProjectAddComponent } from '../components/projects/project-add/project-add.component';
import { PhasesFormComponent } from '../components/phases/phases-form/phases-form.component';
import { ObjectivesComponent } from '../components/objectives/objectives.component';

const routes: Routes = [
  { path: 'Project', component: ProjectListComponent },
  { path: 'Project/Add', component: ProjectAddComponent },
  { path: 'Project/Add/Phase', component: PhasesFormComponent },
  { path: 'Client', component: PhasesFormComponent },
  { path: 'Objective', component: ObjectivesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
