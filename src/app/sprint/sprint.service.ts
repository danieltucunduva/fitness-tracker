import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Identifiers } from '@angular/compiler';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ISprint } from './sprint.model';
import { User } from '../authentication/user.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class SprintService {
    sprintChanged = new Subject<ISprint>();
    pastSprintsChanged = new Subject<boolean>();
    availableSprintsChanged = new Subject<boolean>();
    private sprints: ISprint[] = [];

    private runningSprint: ISprint;
    private pastSprints: ISprint[] = [];

    constructor(
        private http: Http,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    startSprint(selectedId: string, notify: boolean, description: string) {
        this.http
            .get(`http://localhost:3000/api/sprints/${selectedId}`)
            .pipe(map((response) => response.json()))
            .subscribe((response) => {
                const sprintSelected = response;
                this.runningSprint = {
                    ...(sprintSelected),
                    startedDate: new Date(),
                    description: description,
                    notify: notify
                };
                this.runningSprint._id = null;
                this.runningSprint.status = 'running';
                this.sprintChanged.next({ ...this.runningSprint });
            });
    }

    getFullName(sprint: ISprint): string {
        if (sprint.status === 'custom' && !sprint.duration) {
            return sprint.name + '...';
        }
        return sprint.duration < 120 ?
            sprint.name + ' (' + (sprint.duration || '') + 's)' :
            sprint.name + ' (' + (sprint.duration / 60 || '') + 'min)';
    }

    getRunningSprint(): ISprint {
        return { ...this.runningSprint };
    }

    finishSprint(completed: boolean, progress: number): void {
        this.runningSprint.finishedDate = new Date();
        this.runningSprint.status = completed ? 'completed' : 'cancelled';
        this.runningSprint.user = this.authenticationService.getUserId();
        this.runningSprint.progress = progress;
        this.http
            .post('http://localhost:3000/api/sprints', this.runningSprint)
            .subscribe((response) => {
                if (response.ok) {
                    this.runningSprint = null;
                    this.sprintChanged.next(null);
                    this.pastSprintsChanged.next(true);
                    this.router.navigate(['sprint']);
                }
            });
    }

    getAvailableSprints(): Observable<any> {
        return this.http.post('http://localhost:3000/api/available-sprints', this.authenticationService.getUserId());
    }

    getPastSprints(): Observable<any> {
        return this.http.post('http://localhost:3000/api/past-sprints', this.authenticationService.getUserId());
    }

    checkOnePastSprint(): void {
        this.http
            .post('http://localhost:3000/api/one-past-sprint', this.authenticationService.getUserId())
            .pipe(map((response) => response.json()))
            .subscribe((response) => {
                if (response) {
                    this.pastSprintsChanged.next(true);
                } else {
                    this.pastSprintsChanged.next(false);
                }
                this.router.navigate(['sprint']);
            });
    }

    getDefaultSprint(): Observable<any> {
        return this.http.get('http://localhost:3000/api/sprints/default-sprint');
    }

    createSharedSprintTemplate(userId: string, name: string, duration: number): void {
        const newSprint: ISprint = {
            _id: null,
            user: userId,
            name: name,
            description: 'template',
            status: 'custom',
            duration: duration,
        };
        this.http.post('http://localhost:3000/api/sprints/create-template', newSprint)
            .pipe(map((response) => response.json()))
            .subscribe((response) => {
                this.availableSprintsChanged.next(true);
            });
    }
}
