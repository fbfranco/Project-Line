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

const routes: Routes = [
  { path: 'Project', component: ProjectListComponent },
  { path: 'Project/Add', component: ProjectAddComponent },
  { path: 'Project/Edit', component: ProjectAddComponent },
  { path: 'Project/Add/Phase', component: PhasesFormComponent },
  { path: 'Client', component: PhasesFormComponent },
  { path: 'Objective', component: ObjectivesComponent },
  { path: 'Objective/Add', component: ObjectiveAddComponent },
  { path: 'TimeLine', component: TimelineComponent},
  { path: 'User', component: UsersListComponent},
  { path: 'Rol', component: RolesListComponent},
  { path: 'User/Add', component: UsersAddComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
