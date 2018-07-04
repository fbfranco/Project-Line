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
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { MainContainerComponent } from './layout/sidenav/main-container/main-container.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { PhasesComponent } from './components/phases/phases.component';
import { PhasesFormComponent } from './components/phases/phases-form/phases-form.component';
import { ObjectivesComponent } from './components/objectives/objectives.component';
import { ObjectiveAddComponent } from './components/objectives/objective-add/objective-add.component';
import { ObjectivesListComponent } from './components/objectives/objectives-list/objectives-list.component';
import { TimelineComponent } from './components/timeline/timeline/timeline.component';
import { DialogConfirmationComponent } from './components/dialog/dialog-confirmation/dialog-confirmation.component';
// Models
import { ViewModelProject } from './models/viewmodelproject.model';
// Services
import { ProjectService } from './services/project.service';
import { HelperService } from './services/helper.service';
import { ObjectiveService } from './services/objective.service';
// Angular Material
import { AngularMaterialModule } from './material/angular-material.module';
import { MatTableModule } from '@angular/material';
// Routes
import { RoutingModule } from './routes/routing.module';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToolbarComponent,
    SidenavComponent,
    MainContainerComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectAddComponent,
    PhasesComponent,
    PhasesFormComponent,
    ObjectivesComponent,
    ObjectiveAddComponent,
    ObjectivesListComponent,
    TimelineComponent,
    DialogConfirmationComponent
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
  entryComponents: [
    ObjectivesListComponent,
    DialogConfirmationComponent
  ],
  providers: [
    ProjectService,
    ObjectiveService,
    ViewModelProject,
    HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
