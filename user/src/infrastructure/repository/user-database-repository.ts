import { User } from "domain/entity/user";
import { UserRepository } from "domain/repository/user-repository";
import postgres from 'postgres'
import { injectable } from "inversify";

@injectable()
export class UserDatabaseRepository implements UserRepository {
    private sql = postgres("postgres://user:example@db:5432/rental", {})

    async getUser(userId: number): Promise<User> {
        const [user]: [User?] = await this.sql`SELECT * FROM users WHERE id = ${userId}`;
        if (user === undefined) {
            throw new Error("User not found");
        }
        return user;
    }

    async checkUserExists(username: string): Promise<boolean> {
        const [user]: [User?] = await this.sql`SELECT * FROM users WHERE username = ${username}`;
        return user !== undefined;
    }

    async registerUser(user: User): Promise<void> {
        try {
            await this.sql`INSERT INTO users(username, password, email, role) VALUES (${user.username}, ${user.password}, ${user.email}, ${user.role})`;
        } catch (error) {
            throw error;
        }
    }

    async isAgent(userId: number): Promise<boolean> {
        try {
            const user = await this.getUser(userId);
            return user?.role === "agent";
        } catch (error) {
            throw error;
        }
    }
}