import { User } from "../domain/entity/user";
import { UserRepository } from "../domain/repository/user-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UserDto } from "../application/dto/user-dto"

@injectable()
export class UserService {
    @inject(TYPES.UserRepository)
    private _userRepository!: UserRepository;

    async findUser(id: string): Promise<UserDto> {
        let user = await this._userRepository.getUser(id);
        if (!user){
            throw new Error('User not found');
        }
        return new UserDto(user);
    }

    async checkUserExists(username: string): Promise<boolean> {
        return await this._userRepository.checkUserExists(username);
    }

    async createUser(body: any): Promise<void> {
        return await this._userRepository.registerUser(body);
    }
}