import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from '../components/projects/project-list/project-list.component';
import { ProjectAddComponent } from '../components/projects/project-add/project-add.component';
import { PhasesFormComponent } from '../components/phases/phases-form/phases-form.component';

const routes: Routes = [
  { path: 'Project', component: ProjectListComponent },
  { path: 'Project/Add', component: ProjectAddComponent },
  { path: 'Project/Edit', component: ProjectAddComponent },
  { path: 'Project/Add/Phase', component: PhasesFormComponent },
  { path: 'Client', component: PhasesFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
