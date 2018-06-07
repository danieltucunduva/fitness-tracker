export interface ISprint {
    _id: string;
    user?: string; // _id of user
    name: string;
    description: string;
    duration?: number; // in seconds
    status: 'default' | 'custom' | 'running' | 'completed' | 'cancelled';
    progress?: number; // as a percentage
    createdAt?: Date;
    startedAt?: Date;
    finishedAt?: Date;
    notify?: boolean;
    users?: string[];
}
