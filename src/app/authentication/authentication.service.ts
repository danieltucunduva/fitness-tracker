import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { AuthenticationData } from './authentication-data.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    authenticationChange = new Subject<boolean>();
    usernameAvailableChange = new Subject<boolean>();
    invalidLoginChange = new Subject<boolean>();
    baseApiUrl = environment.baseApiUrl;

    constructor(
        private http: Http,
        private router: Router) { }

    registerUser(authenticationData: AuthenticationData): void {
        const newUser: User = {
            _id: null,
            username: authenticationData.username,
            password: authenticationData.password
        };
        this.http
            .post(this.baseApiUrl + 'users', newUser)
            .pipe(map(response => response.json()))
            .subscribe((signupResponse) => {
                if (signupResponse.status === 201) {
                    this.login({
                        username: signupResponse.data.username,
                        password: signupResponse.data.password
                    });
                }
            }, error => {
                if (error.status === 409) {
                    this.usernameAvailableChange.next(false);
                }
            });
    }

    login(authenticationData: AuthenticationData): void {
        const user: User = {
            _id: null,
            username: authenticationData.username,
            password: authenticationData.password
        };
        this.http
            .post(this.baseApiUrl + 'users/login', user)
            .pipe(map(response => response.json()))
            .subscribe(response => {
                if (response.status === 200) {
                    this.invalidLoginChange.next(false);
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    this.authenticationChange.next(true);
                    this.router.navigate(['sprint']);
                } else {
                }
            },
                error => {
                    this.invalidLoginChange.next(true);
                    localStorage.removeItem('currentUser');
                    this.authenticationChange.next(false);
                });
    }

    logout(redirectTo: string = 'login'): boolean {
        localStorage.removeItem('currentUser');
        this.authenticationChange.next(false);
        this.router.navigate([redirectTo]);
        return localStorage.getItem('currentUser') === '';
    }

    getUserId(): string {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;
        if (user === null) {
            this.logout();
            return null;
        }
        this.http
            .post(this.baseApiUrl + 'users/id', user)
            .pipe(map(response => response.json()))
            .subscribe(response => {
                if (response.status === 200) {
                    return response.body.data;
                }
            }, error => {
                return null;
            });
    }

    getUserName(): string {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;
        return user.username;
    }

    isAuthenticated(): boolean {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.authenticationChange.next(true);
            return true;
        } else {
            // not logged return false
            return false;
        }
    }

    deleteLoggedUser(): void {
        const user = JSON.parse(localStorage.getItem('currentUser')) as User;
        if (user === null) {
            this.logout();
            return;
        }
        this.http
            .delete(this.baseApiUrl + `users/${this.getUserId()}`)
            .pipe(map(response => response.json()))
            .subscribe(response => {
                this.logout('signup');
            }, error => {
                console.log('Delete user: error');
            });

    }
}
