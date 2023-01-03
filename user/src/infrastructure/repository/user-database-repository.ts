import { User } from "domain/entity/user";
import { UserRepository } from "domain/repository/user-repository";
import { injectable } from "inversify";

@injectable()
class UserDatabaseRepository implements UserRepository {
    registerUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUser(userId: string): Promise<User> {
        console.log(userId);
        throw new Error("Method not implemented.");
    }
    checkUserExists(username: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}