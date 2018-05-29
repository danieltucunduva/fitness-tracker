import { ISprint } from './sprint.model';
import { Subject } from 'rxjs';

export class SprintService {
    sprintChanged = new Subject<ISprint>();
    private sprints: ISprint[] = [
        {
            id: 'instant',
            name: 'Instant',
            description: 'A very short 1min sprint',
            duration: 1,
            status: 'default'
        },
        {
            id: 'short',
            name: 'Short',
            description: 'A short 5min sprint',
            duration: 5,
            status: 'default'
        },
        {
            id: 'pomodoro',
            name: 'Pomodoro',
            description: 'A standard 20min pomodoro sprint',
            duration: 20,
            status: 'default'
        }
    ];
    private runningSprint: ISprint;
    private pastSprints: ISprint[] = [
        {
            id: 'instant',
            name: 'Instant',
            description: 'A very short 1min sprint',
            duration: 1,
            startedAt: new Date(),
            status: 'completed'
        },
        {
            id: 'short',
            name: 'Short',
            description: 'A short 5min sprint',
            duration: 5,
            startedAt: new Date(),
            status: 'cancelled'
        },
        {
            id: 'pomodoro',
            name: 'Pomodoro',
            description: 'A standard 20min pomodoro sprint',
            duration: 20,
            startedAt: new Date(),
            status: 'completed'
        }
    ];

    getAvailableSprints(): ISprint[] {
        return this.sprints.slice();
    }

    startSprint(selectedId: string) {
        const sprintSelected = this.sprints.find(sprint => sprint.id === selectedId);
        this.runningSprint = {
            ...(sprintSelected),
            startedAt: new Date()
        };
        this.sprintChanged.next({ ...this.runningSprint });
    }

    getRunningSprint(): ISprint {
        return { ...this.runningSprint };
    }

    completeSprint(): void {
        // log sprint
        this.pastSprints.push({
            ...this.runningSprint,
            status: 'completed',
            completedAt: new Date()
        });
        this.runningSprint = null;
        this.sprintChanged.next(null);
    }

    cancelRunningSprint(progress: number): void {
        // log sprint
        this.pastSprints.push({
            ...this.runningSprint,
            status: 'cancelled',
            cancelledAt: new Date(),
            durationCompleted: this.runningSprint.duration * progress / 100
        });
        this.runningSprint = null;
        this.sprintChanged.next(null);
    }

    getPastSprints() {
        return this.pastSprints.slice();
    }

}
