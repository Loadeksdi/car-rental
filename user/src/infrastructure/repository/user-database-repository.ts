import { User } from "domain/entity/user";
import { UserRepository } from "domain/repository/user-repository";
import postgres from 'postgres'
import { injectable } from "inversify";

@injectable()
export class UserDatabaseRepository implements UserRepository {
    private sql = postgres("postgres://user:example@db:5432/rental", {})
    
    async getUser(userId: string): Promise<User | undefined> {
        const [user]: [User?] = await this.sql`SELECT * FROM users WHERE id = ${userId}`;
        return user;
    }
    
    async checkUserExists(username: string): Promise<boolean> {
        const [user]: [User?] = await this.sql`SELECT * FROM users WHERE username = ${username}`;
        return user !== undefined;
    }
    
    async registerUser(user: User): Promise<void> {
        await this.sql`INSERT INTO users(username, password, email) VALUES (${user.username}, ${user.password}, ${user.email})`;
    }
}