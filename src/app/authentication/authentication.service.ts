import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { AuthenticationData } from './authentication-data.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';


@Injectable()
export class AuthenticationService {
    authenticationChange = new Subject<boolean>();
    private user: User = null;

    constructor(
        private http: Http,
        private router: Router) { }

    registerUser(authenticationData: AuthenticationData): void {
        this.user = {
            _id: null,
            email: authenticationData.email,
            password: authenticationData.password
        };
        this.http.post('http://localhost:3000/api/users', this.user).subscribe((response) => {
            if (response.ok) {
                return this.login(authenticationData);
            }
        });
    }

    login(authenticationData: AuthenticationData): void {
        this.user = {
            _id: null,
            email: authenticationData.email,
            password: authenticationData.password
        };
        this.http
            .post('http://localhost:3000/api/login', this.user)
            .pipe(map(response => response.json()))
            .subscribe(response => {
                if (response.length === 1
                    && response[0].email === this.user.email
                    && response[0].password === this.user.password
                ) {
                    this.user = response[0];
                    this.authenticationChange.next(true);
                    this.router.navigate(['sprint']);
                } else {
                    this.user = null;
                    this.authenticationChange.next(false);
                }
            });
    }

    logout(): boolean {
        this.user = null;
        this.authenticationChange.next(false);
        this.router.navigate(['login']);
        return this.user === null;
    }

    getUserId(): string {
        return { ...this.user }._id;
    }

    getUserName(): string {
        return { ...this.user }.email;
    }

    isAuthenticated(): boolean {
        return this.user != null;
    }
}
