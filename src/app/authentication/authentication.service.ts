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
        this.user = {
            _id: null,
            username: authenticationData.username,
            password: authenticationData.password
        };
        this.http
            .post('http://localhost:3000/api/users', this.user)
            .pipe(map(response => response.json()))
            .subscribe((signupResponse) => {
                if (signupResponse.status === 201) {
                    this.login({
                        username: signupResponse.data.username,
                        password: signupResponse.data.password
                    });
                } else {
                    this.user = null;
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
            .post('http://localhost:3000/api/users/login', this.user)
            .pipe(map(response => response.json()))
            .subscribe(response => {
                if (response.status === 200) {
                    this.invalidLoginChange.next(false);
                    this.user = response.data;
                    this.authenticationChange.next(true);
                    this.router.navigate(['sprint']);
                } else {
                }
            },
                error => {
                    this.invalidLoginChange.next(true);
                    this.user = null;
                    this.authenticationChange.next(false);
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
        if (this.user === null || this.user._id === null) {
            return;
        } else {
            this.http
                .delete(`http://localhost:3000/api/users/${this.user._id}`)
                .pipe(map(response => response.json()))
                .subscribe(response => {
                    if (response.status === 200) {
                        this.authenticationChange.next(false);
                        this.router.navigate(['signup']);
                    } else {
                    }
                }, error => {
                    console.log('Delete user: error');
                });
        }
    }
}
