import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        } else {
            // return true here to shortcircuit route guard
            this.router.navigate(['login']);
            return false;
        }
    }

}
