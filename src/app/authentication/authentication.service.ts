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
    usernameAvailableChange = new Subject<boolean>();
    invalidLoginChange = new Subject<boolean>();
    private user: User = null;

    constructor(
        private http: Http,
        private router: Router) { }


    registerUser(authenticationData: AuthenticationData): void {
        this.http
            .post('http://localhost:3000/api/users/check', authenticationData.username)
            .pipe(map(response => response.json()))
            .subscribe(response => {
                if (response) {
                    this.usernameAvailableChange.next(true);
                    this.user = {
                        _id: null,
                        username: authenticationData.username,
                        password: authenticationData.password
                    };
                    this.http.post('http://localhost:3000/api/users', this.user).subscribe((signupResponse) => {
                        if (signupResponse.ok) {
                            this.login(authenticationData);
                        }
                    });
                } else {
                    this.usernameAvailableChange.next(false);
                }
            });
    }

    login(authenticationData: AuthenticationData): void {
        this.user = {
            _id: null,
            username: authenticationData.username,
            password: authenticationData.password
        };
        this.http
            .post('http://localhost:3000/api/login', this.user)
            .pipe(map(response => response.json()))
            .subscribe(response => {
                if (response.length === 1
                    && response[0].username === this.user.username
                    && response[0].password === this.user.password
                ) {
                    this.invalidLoginChange.next(false);
                    this.user = response[0];
                    this.authenticationChange.next(true);
                    this.router.navigate(['sprint']);
                } else {
                    this.invalidLoginChange.next(true);
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
        return { ...this.user }.username;
    }

    isAuthenticated(): boolean {
        return this.user != null;
    }

    deleteLoggedUser(): void {
        if (this.user === null) {
            return;
        } else {
            this.http
                .post('http://localhost:3000/api/delete-user', this.user)
                .pipe(map(response => response.json()))
                .subscribe(response => {
                    if (response.n === 1) {
                        this.authenticationChange.next(false);
                        this.router.navigate(['signup']);
                    }
                });
        }
    }
}
