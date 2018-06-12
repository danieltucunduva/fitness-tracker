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

import { environment } from '../../environments/environment';

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
        private authenticationService: AuthenticationService) { }

    startSprint(selectedId: string, notify: boolean, description: string) {
        this.http
            .get(this.baseApiUrl + `sprint-templates/${selectedId}`)
            .pipe(map((response) => response.json()))
            .subscribe((response) => {
                const sprintSelected = response.data;
                this.runningSprint = {
                    ...(sprintSelected),
                    startedAt: new Date(),
                    description: description,
                    notify: notify
                };
                this.runningSprint._id = null;
                this.runningSprint.status = 'running';
                this.runningSprint.user = this.authenticationService.getUserId();
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

    /**
     * Creates a new pastSprint (finished or cancelled)
     * @param completed
     * @param progress
     */
    finishSprint(completed: boolean, progress: number): void {
        if (!this.runningSprint.finishedAt) {
            this.runningSprint.finishedAt = new Date();
        }
        this.runningSprint.status = completed ? 'completed' : 'cancelled';
        this.runningSprint.user = this.authenticationService.getUserId();
        this.runningSprint.progress = progress;
        this.http
            .post(this.baseApiUrl + 'past-sprints/new', this.runningSprint)
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
        return this.http.get(this.baseApiUrl + 'sprint-templates/', this.authenticationService.getUserId());
    }

    /**
     * Retrieves past sprints of logged user
     */
    getPastSprints(): Observable<any> {
        return this.http.post(this.baseApiUrl + 'past-sprints/', { userId: this.authenticationService.getUserId() });
    }

    getDefaultSprint(): Observable<any> {
        return this.http.get(this.baseApiUrl + 'sprints/default-sprint');
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
        this.http.post(this.baseApiUrl + 'sprints/create-template', newSprint)
            .pipe(map((response) => response.json()))
            .subscribe((response) => {
                this.availableSprintsChanged.next(true);
            });
    }
}
