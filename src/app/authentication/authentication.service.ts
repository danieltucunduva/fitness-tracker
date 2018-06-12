import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { AuthenticationData } from './authentication-data.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

import * as auth0 from 'auth0-js';

@Injectable()
export class AuthenticationService {
  authenticationChange = new Subject<boolean>();
  usernameAvailableChange = new Subject<boolean>();
  invalidLoginChange = new Subject<boolean>();
  baseApiUrl = environment.baseApiUrl;

  auth0 = new auth0.WebAuth({
    clientID: '492tUkLs7lAxnYAYwyDmLL7gaWbQbM9j',
    domain: 'sprint-ng.auth0.com',
    audience: 'https://sprint-ng.auth0.com/api/v2/',
    redirectUri: 'https://sprint-ng.herokuapp.com/callback',
    responseType: 'token id_token',
    scope: 'openid profile email user_metadata app_metadata picture user_id'
  });

  // Store authentication data
  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;
  constructor(private http: Http, private router: Router) { }

  registerUser(authenticationData: AuthenticationData): void {
    const newUser: User = {
      _id: null,
      username: authenticationData.username,
      password: authenticationData.password
    };
    this.http
      .post(this.baseApiUrl + 'users', newUser)
      .pipe(map(response => response.json()))
      .subscribe(
        signupResponse => {
          if (signupResponse.status === 201) {
            this.login();
          }
        },
        error => {
          if (error.status === 409) {
            this.usernameAvailableChange.next(false);
          }
        }
      );
  }

  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }
  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        this.invalidLoginChange.next(false);
        this.authenticationChange.next(true);
        this.router.navigate(['sprint']);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;

    localStorage.setItem('expiresAt', String(this.expiresAt));
    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('currentUser', JSON.stringify(this.userProfile));
    localStorage.setItem('userName', this.userProfile.name);
    localStorage.setItem('id', this.userProfile.sub);

    localStorage.setItem('authenticated', 'true');
  }

  logout(): boolean {
    localStorage.clear();
    this.authenticationChange.next(false);
    this.auth0.logout({
      returnTo: 'https://sprint-ng.herokuapp.com/',
      clientID: '492tUkLs7lAxnYAYwyDmLL7gaWbQbM9j'
    });

    return localStorage.getItem('currentUser') === '';
  }

  getUserId(): string {
    return localStorage.getItem('id');
  }

  getUserName(): string {
    return localStorage.getItem('userName');
  }
  isAuthenticated(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally

    const expi = localStorage.getItem('expiresAt');
    const auth = localStorage.getItem('authenticated');

    if (Date.now() < Number(expi) && Boolean(auth)) {
      this.invalidLoginChange.next(false);
      this.authenticationChange.next(true);
      return true;
    } else {
      this.authenticationChange.next(false);
      return false;
    }
  }

  deleteLoggedUser(): void {
    const id = localStorage.getItem('id');
    if (id === null) {
      this.logout();
      return;
    } else {
      this.http
        .delete(this.baseApiUrl + `users/${id}`)
        .pipe(map(response => response.json()))
        .subscribe(
          response => {
            this.logout();
          },
          error => {
            console.log('Delete user: error');
          }
        );
    }
  }
}
