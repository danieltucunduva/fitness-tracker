import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { SprintComponent } from './sprint/sprint.component';
import { CurrentSprintComponent } from './sprint/current-sprint/current-sprint.component';
import { NewSprintComponent } from './sprint/new-sprint/new-sprint.component';
import { PastSprintsComponent } from './sprint/past-sprints/past-sprints.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopSprintDialogComponent } from './sprint/current-sprint/stop-sprint-dialog/stop-sprint-dialog.component';
import { AuthenticationService } from './authentication/authentication.service';
import { TermsDialogComponent } from './authentication/signup/terms-dialog/terms-dialog.component';
import { SprintService } from './sprint/sprint.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SprintComponent,
    CurrentSprintComponent,
    NewSprintComponent,
    PastSprintsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopSprintDialogComponent,
    TermsDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService,
    SprintService
  ],
  bootstrap: [AppComponent],
  entryComponents: [StopSprintDialogComponent, TermsDialogComponent]
})
export class AppModule { }
