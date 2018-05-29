import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthenticationData } from './authentication-data.model';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {
    authenticationChange = new Subject<boolean>();
    private user: User = null;

    constructor(private router: Router) { }

    registerUser(authenticationData: AuthenticationData): boolean {
        this.user = {
            email: authenticationData.email,
            userId: Math.round(Math.random() * 1000)
        };
        return this.login(authenticationData);
    }

    login(authenticationData: AuthenticationData): boolean {
        this.user = {
            email: authenticationData.email,
            userId: Math.round(Math.random() * 1000)
        };
        this.authenticationChange.next(true);
        this.router.navigate(['sprint']);
        return true;
    }

    logout(): boolean {
        this.user = null;
        this.authenticationChange.next(false);
        this.router.navigate(['login']);
        return this.user === null;
    }

    getUser(): User {
        return { ...this.user };
    }

    isAuthenticated(): boolean {
        return this.user != null;
    }
}
