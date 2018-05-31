export interface ISprint {
    _id: string;
    user?: string;
    name: string;
    description?: string;
    duration: number;
    status: 'default' | 'custom' | 'running' | 'completed' | 'cancelled';
    durationCompleted?: number;
    creationDate?: Date;
    startedDate?: Date;
    completedDate?: Date;
    cancelledDate?: Date;
}
