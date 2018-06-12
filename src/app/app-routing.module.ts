import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./authentication/signup/signup.component";
import { LoginComponent } from "./authentication/login/login.component";
import { SprintComponent } from "./sprint/sprint.component";
import {
  AuthenticationGuardGuest,
  AuthenticationGuardLoggedIn
} from "./authentication/authentication.guard";
import { CallbackComponent } from "./authentication/callback/callback.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [AuthenticationGuardLoggedIn]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthenticationGuardLoggedIn]
  },
  {
    path: "sprint",
    component: SprintComponent,
    canActivate: [AuthenticationGuardGuest]
  },
  { path: "callback", component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuardGuest, AuthenticationGuardLoggedIn]
})
export class AppRoutingModule {}
