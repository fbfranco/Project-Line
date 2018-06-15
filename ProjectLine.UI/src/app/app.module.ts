// Config
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MainContainerComponent } from './layout/main-container/main-container.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/clients/client/client.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ObjectivesComponent } from './components/objectives/objectives.component';
import { ObjectiveAddComponent } from './components/objectives/objective-add/objective-add.component';
// Services
import { ClientService } from './services/client.service';
import { ProjectService } from './services/project.service';
import { ObjectiveService } from './services/objective.service';
// Angular Material
import { AngularMaterialModule } from './material/angular-material.module';
import { RoutingModule } from './routes/routing.module';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { PhasesComponent } from './components/phases/phases.component';
import { PhasesFormComponent } from './components/phases/phases-form/phases-form.component';
import { MatTableModule } from '@angular/material';
import { ViewModelProject } from './models/viewmodelproject.model';
import { ObjectivesListComponent } from './components/objectives/objectives-list/objectives-list.component';




@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientComponent,
    ClientListComponent,
    LayoutComponent,
    MainContainerComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectAddComponent,
    PhasesComponent,
    PhasesFormComponent,
    ObjectivesComponent,
    ObjectiveAddComponent,
    ObjectivesListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    RoutingModule,
    MatTableModule,
  ],
  providers: [
    ClientService,
    ProjectService,
    ObjectiveService,
    ViewModelProject
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
