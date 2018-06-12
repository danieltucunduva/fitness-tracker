import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ISprint } from './sprint.model';
import { AuthenticationService } from '../authentication/authentication.service';

import { environment } from '../../environments/environment';

import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  sprintChanged = new Subject<ISprint>();
  pastSprintsChanged = new Subject<boolean>();
  availableSprintsChanged = new Subject<boolean>();
  private sprints: ISprint[] = [];
  baseApiUrl = environment.baseApiUrl;

  private runningSprint: ISprint;
  private pastSprints: ISprint[] = [];

  constructor(
    private http: Http,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  startSprint(selectedId: string, notify: boolean, description: string) {
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
    this.http
      .get(this.baseApiUrl + `sprint-templates/${selectedId}`, {
        headers: headers
      })
      .pipe(map(response => response.json()))
      .subscribe(
        response => {
          const sprintSelected = response.data;
          this.runningSprint = {
            ...sprintSelected,
            startedAt: new Date(),
            description: description,
            notify: notify
          };
          this.runningSprint._id = null;
          this.runningSprint.status = 'running';
          this.sprintChanged.next({ ...this.runningSprint });
        },
        err => {
          this.errorManager(err);
        }
      );
  }

  getFullName(sprint: ISprint): string {
    if (sprint.status === 'custom' && !sprint.duration) {
      return sprint.name + '...';
    }
    return sprint.duration < 120
      ? sprint.name + ' (' + (sprint.duration || '') + 's)'
      : sprint.name + ' (' + (sprint.duration / 60 || '') + 'min)';
  }

  getRunningSprint(): ISprint {
    return { ...this.runningSprint };
  }

  /**
   * Creates a new pastSprint (finished or cancelled)
   * @param completed
   * @param progress
   */
  finishSprint(completed: boolean, progress: number): void {
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
    this.runningSprint.finishedAt = new Date();
    this.runningSprint.status = completed ? 'completed' : 'cancelled';
    this.runningSprint.user = this.authenticationService.getUserId();
    this.runningSprint.progress = progress;
    this.http
      .post(this.baseApiUrl + 'past-sprints/new', this.runningSprint, {
        headers: headers
      })
      .subscribe(
        response => {
          if (response.ok) {
            this.runningSprint = null;
            this.sprintChanged.next(null);
            this.pastSprintsChanged.next(true);
            this.router.navigate(['sprint']);
          }
        },
        err => {
          this.errorManager(err);
        }
      );
  }

  getAvailableSprints(): Observable<any> {
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
    return this.http.get(this.baseApiUrl + 'sprint-templates/', {
      headers: headers
    });
  }

  /**
   * Retrieves past sprints of logged user
   */
  getPastSprints(): Observable<any> {
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
    return this.http.post(
      this.baseApiUrl + 'past-sprints/',
      { userId: this.authenticationService.getUserId() },
      { headers: headers }
    );
  }

  getDefaultSprint(): Observable<any> {
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
    return this.http.get(this.baseApiUrl + 'sprints/default-sprint', {
      headers: headers
    });
  }

  createSharedSprintTemplate(
    userId: string,
    name: string,
    duration: number
  ): void {
    const newSprint: ISprint = {
      _id: null,
      user: userId,
      name: name,
      description: 'template',
      status: 'custom',
      duration: duration
    };
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
    this.http
      .post(this.baseApiUrl + 'sprints/create-template', newSprint, {
        headers: headers
      })
      .pipe(map(response => response.json()))
      .subscribe(
        response => {
          this.availableSprintsChanged.next(true);
        },
        err => {
          this.errorManager(err);
        }
      );
  }
  errorManager(e) {
    alert(e.statusText);
    if (e.status === 401) {
      this.authenticationService.logout();
    }
  }
}
