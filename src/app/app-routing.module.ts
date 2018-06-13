import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SprintComponent } from './sprint/sprint.component';
import {
  AuthenticationRouteGuard,
} from './authentication/authentication.guard';


const routes: Routes = [
  { path: '', component: WelcomeComponent, data: { state: 'home' } },
  { path: 'sprint', component: SprintComponent, data: { state: 'sprint' }, canActivate: [AuthenticationRouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationRouteGuard]
})
export class AppRoutingModule { }
