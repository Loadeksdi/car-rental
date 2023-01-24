import { User } from "domain/entity/user";

export interface UserRepository {

    registerUser(user: User): Promise<void>;

    getUser(userId: string): Promise<User | undefined>;

    checkUserExists(username: string): Promise<boolean>;

}