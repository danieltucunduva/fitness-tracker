export interface ISprint {
    id: string;
    name: string;
    description?: string;
    duration: number;
    status: 'default' | 'custom' | 'running' | 'completed' | 'cancelled';
    durationCompleted?: number;
    createdAt?: Date;
    startedAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
}
