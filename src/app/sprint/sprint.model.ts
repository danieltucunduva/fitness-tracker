export interface ISprint {
    _id: string;
    name: string;
    duration: number; // in seconds
    status: 'default' | 'running' | 'completed' | 'cancelled';
    progress: number; // as a percentage
    description: string;
    notify: boolean;
    user: string;
    createdAt: Date;
    startedAt?: Date;
    finishedAt?: Date;
}
