import { User } from "domain/entity/user";

export interface UserRepository {

    registerUser(user: User): Promise<void>;

    getUser(userId: number): Promise<User>;

    checkUserExists(username: string): Promise<boolean>;

    isAgent(userId: number): Promise<boolean>;

}