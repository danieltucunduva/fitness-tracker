export class User {
    _id: string;
    username: string;
    password: string;
    birthdate?: Date;
    creationDate?: Date;
    shared_sprints?: string[];
}
