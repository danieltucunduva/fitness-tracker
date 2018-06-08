import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuardGuest implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

}

@Injectable()
export class AuthenticationGuardLoggedIn implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.isAuthenticated()) {
            this.router.navigate(['sprint']);
            return false;
        } else {
            return true;
        }
    }

}