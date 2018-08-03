// Config
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

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
import { AuthGuardService } from './services/auth-guard.service';
// Angular Material
import { AngularMaterialModule } from './material/angular-material.module';
import { MatTableModule } from '@angular/material';
// Routes
import { RoutingModule } from './routes/routing.module';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { RolesListComponent } from './components/roles/roles-list/roles-list.component';
import { UsersAddComponent } from './components/users/users-add/users-add.component';
import { RolesAddComponent } from './components/roles/roles-add/roles-add.component';
import { ProgressComponent } from './components/progress/progress.component';
import { LoginComponent } from './login/login.component';
import { SelectedValidator } from './Directives/client-owner-autocomplete.directive';
import { AdminHomeComponent } from './components/homes/admin-home/admin-home.component';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { UserGuard } from './services/user.guard.service';
import { ClientGuard } from './services/client.guard.service';

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
    DialogConfirmationComponent,
    UsersListComponent,
    RolesListComponent,
    UsersAddComponent,
    RolesAddComponent,
    ProgressComponent,
    LoginComponent,
    SelectedValidator,
    AdminHomeComponent,
    HomeTestComponent,
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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  entryComponents: [
    ObjectivesListComponent,
    DialogConfirmationComponent
  ],
  providers: [
    ProjectService,
    ObjectiveService,
    ViewModelProject,
    HelperService,
    AuthGuardService,
    UserGuard,
    ClientGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
