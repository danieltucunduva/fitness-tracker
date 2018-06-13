import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SprintComponent } from './sprint/sprint.component';
import { OngoingSprintComponent } from './sprint/ongoing-sprint/ongoing-sprint.component';
import { NewSprintComponent } from './sprint/new-sprint/new-sprint.component';
import { PastSprintsComponent } from './sprint/past-sprints/past-sprints.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SprintFinishedDialogComponent } from './sprint/ongoing-sprint/sprint-finished-dialog/sprint-finished-dialog.component';
import { AuthenticationService } from './authentication/authentication.service';
import { TermsDialogComponent } from './welcome/terms-dialog/terms-dialog.component';
import { DeleteDataDialogComponent } from './sprint/past-sprints/delete-data-dialog/delete-data-dialog.component';
import { SprintService } from './sprint/sprint.service';
import { LoggedUserNameComponent } from './authentication/logged-user-name/logged-user-name.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { VersionTagComponent } from './welcome/version-tag/version-tag.component';
import { StopSprintDialogComponent } from './sprint/ongoing-sprint/stop-sprint-dialog/stop-sprint-dialog.component';


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    OngoingSprintComponent,
    NewSprintComponent,
    PastSprintsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SprintFinishedDialogComponent,
    TermsDialogComponent,
    LoggedUserNameComponent,
    VersionTagComponent,
    DeleteDataDialogComponent,
    StopSprintDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    SprintService,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [TermsDialogComponent, StopSprintDialogComponent, SprintFinishedDialogComponent, DeleteDataDialogComponent]
})
export class AppModule { }
