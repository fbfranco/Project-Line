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
import { RolesListComponent } from '../components/roles/roles-list/roles-list.component';
import { UsersAddComponent } from '../components/users/users-add/users-add.component';
import { RolesAddComponent } from '../components/roles/roles-add/roles-add.component';
import { AdminHomeComponent } from '../components/homes/admin-home/admin-home.component';
import { UserGuard } from '../services/user.guard.service';
import { ClientGuard } from '../services/client.guard.service';

const routes: Routes = [
  { path: 'Projects', component: ProjectListComponent, canActivate: [ClientGuard] },
  { path: 'Projects/Add', component: ProjectAddComponent, canActivate: [ClientGuard] },
  { path: 'Projects/Edit/:id', component: ProjectAddComponent, canActivate: [ClientGuard] },
  { path: 'Projects/Add/Phase', component: PhasesFormComponent, canActivate: [ClientGuard] },
  { path: 'Clients', component: PhasesFormComponent },
  { path: 'Objectives', component: ObjectivesComponent, canActivate: [ClientGuard] },
  { path: 'Objectives/Add', component: ObjectiveAddComponent, canActivate: [ClientGuard] },
  { path: 'ProjectTracking', component: TimelineComponent },
  { path: 'Users', component: UsersListComponent, canActivate: [UserGuard] },
  { path: 'Roles', component: RolesListComponent, canActivate: [UserGuard] },
  { path: 'Users/Add', component: UsersAddComponent, canActivate: [UserGuard] },
  { path: 'Users/Edit/:id', component: UsersAddComponent, canActivate: [UserGuard] },
  { path: 'Roles/Add', component: RolesAddComponent, canActivate: [UserGuard] },
  { path: 'Home', component: AdminHomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
