import { User } from "domain/entity/user";
import { UserRepository } from "domain/repository/user-repository";
import sql from "infrastructure/database/database";
import { injectable } from "inversify";

@injectable()
class UserDatabaseRepository implements UserRepository {
    
    async getUser(userId: string): Promise<User | undefined> {
        const [user]: [User?] = await sql`SELECT * FROM users WHERE id = ${userId}`;
        return user;
    }
    
    async checkUserExists(username: string): Promise<boolean> {
        const [user]: [User?] = await sql`SELECT * FROM users WHERE username = ${username}`;
        return user !== undefined;
    }
    
    async registerUser(user: User): Promise<void> {
        await sql`INSERT INTO users(username, password, email) VALUES (${user.username}, ${user.password}, ${user.email})`;
    }
}