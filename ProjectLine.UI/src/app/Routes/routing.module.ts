import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from '../components/clients/client/client.component';
import { ProjectListComponent } from '../components/projects/project-list/project-list.component';

const routes: Routes = [
  { path: 'Client', component: ClientComponent },
  { path: 'Project', component: ProjectListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
