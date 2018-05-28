import { User } from './user.model';
import { AuthenticationData } from './authentication-data.model';

export class AuthenticationService {
    private user: User = null;

    registerUser(authenticationData: AuthenticationData): boolean {
        this.user = {
            email: authenticationData.email,
            userId: Math.round(Math.random() * 1000)
        };
        return true;
    }

    login(authenticationData: AuthenticationData): boolean {
        this.user = {
            email: authenticationData.email,
            userId: Math.round(Math.random() * 1000)
        };
        return true;
    }

    logout(): boolean {
        this.user = null;
        return this.user === null;
    }

    getUser(): User {
        return { ...this.user };
    }

    isAuthenticated(): boolean {
        return this.user != null;
    }
}
