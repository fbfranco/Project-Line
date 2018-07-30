import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from '../components/projects/project-list/project-list.component';
import { ProjectAddComponent } from '../components/projects/project-add/project-add.component';
import { PhasesFormComponent } from '../components/phases/phases-form/phases-form.component';
import { ObjectivesComponent } from '../components/objectives/objectives.component';
import { ObjectiveAddComponent } from '../components/objectives/objective-add/objective-add.component';
import { TimelineComponent } from '../components/timeline/timeline/timeline.component';
import { UsersListComponent } from '../components/users/users-list/users-list.component';
import { RolesListComponent  } from '../components/roles/roles-list/roles-list.component';
import { UsersAddComponent } from '../components/users/users-add/users-add.component';
import { RolesAddComponent } from '../components/roles/roles-add/roles-add.component';


const routes: Routes = [
  { path: 'Projects', component: ProjectListComponent },
  { path: 'Projects/Add', component: ProjectAddComponent },
  { path: 'Projects/Edit/:id', component: ProjectAddComponent },
  { path: 'Projects/Add/Phase', component: PhasesFormComponent },
  { path: 'Clients', component: PhasesFormComponent },
  { path: 'Objectives', component: ObjectivesComponent },
  { path: 'Objectives/Add', component: ObjectiveAddComponent },
  { path: 'ProjectTracking', component: TimelineComponent},
  { path: 'Users', component: UsersListComponent},
  { path: 'Roles', component: RolesListComponent},
  { path: 'Users/Add', component: UsersAddComponent },
  { path: 'Users/Edit/:id', component: UsersAddComponent },
  { path: 'Roles/Add', component: RolesAddComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
