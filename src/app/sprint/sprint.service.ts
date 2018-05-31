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
    private sprints: ISprint[] = [];

    private runningSprint: ISprint;
    private pastSprints: ISprint[] = [];

    constructor(
        private http: Http,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    startSprint(selectedId: string) {
        this.http
            .get(`http://localhost:3000/api/sprints/${selectedId}`)
            .pipe(map((response) => response.json()))
            .subscribe((response) => {
                const sprintSelected = response;
                this.runningSprint = {
                    ...(sprintSelected),
                    startedDate: new Date(),
                };
                this.runningSprint._id = null;
                this.runningSprint.status = 'running';
                this.sprintChanged.next({ ...this.runningSprint });
            });
    }

    getRunningSprint(): ISprint {
        return { ...this.runningSprint };
    }

    completeSprint(): void {
        this.runningSprint.completedDate = new Date();
        this.runningSprint.status = 'completed';
        this.runningSprint.user = this.authenticationService.getUserId();
        this.runningSprint.durationCompleted = this.runningSprint.duration;
        this.http
            .post('http://localhost:3000/api/sprints', this.runningSprint)
            .subscribe((response) => {
                if (response.ok) {
                    this.runningSprint = null;
                    setTimeout(() => {
                        this.sprintChanged.next(null);
                        this.router.navigate(['sprint']);
                    }, 5000);
                }
            });
    }

    cancelRunningSprint(progress: number): void {
        // TODO set the duration completed
        this.runningSprint.cancelledDate = new Date();
        this.runningSprint.status = 'cancelled';
        this.http.post(`http://localhost:3000/api/sprints`, this.runningSprint).subscribe((response) => {
            if (response.ok) {
                this.runningSprint = null;
                this.sprintChanged.next(null);
                this.router.navigate(['sprint']);
            }
        });
    }

    getAvailableSprints(_id: string): Observable<any> {
        return this.http.post('http://localhost:3000/api/available-sprints', _id);
    }

    getPastSprints(): Observable<any> {
        return this.http.get('http://localhost:3000/api/past-sprints');
    }

    getHasPastSprints(): boolean {
        return true;
    }
}
