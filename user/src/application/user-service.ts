import { User } from "domain/entity/user";
import { UserRepository } from "domain/repository/user-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class UserService {
    @inject(TYPES.UserRepository)
    private _userRepository!: UserRepository;

    findUser(id: string): Promise<User> {
        return this._userRepository.getUser(id);
    }

    checkUserExists(username: string): Promise<boolean> {
        return this._userRepository.checkUserExists(username);
    }

    createUser(body: any): Promise<void> {
        const user = new User(body.id, body.username, body.password, body.email);
        return this._userRepository.registerUser(user);
    }
}