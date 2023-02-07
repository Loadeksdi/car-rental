import { User } from "../domain/entity/user";
import { UserRepository } from "../domain/repository/user-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UserDto } from "../application/dto/user-dto"

@injectable()
export class UserService {
    @inject(TYPES.UserRepository) private _userRepository!: UserRepository;

    async findUser(id: string): Promise<UserDto> {
        try {
            let user = await this._userRepository.getUser(parseInt(id));
            return new UserDto(user);
        } catch(error) {
            throw error;
        }
    }

    async checkUserExists(username: string): Promise<boolean> {
        return await this._userRepository.checkUserExists(username);
    }

    async createUser(body: any): Promise<User> {
        try {
            return await this._userRepository.registerUser(body);
        } catch (error) {
            throw error;
        }
    }

    async isAgent(userId: number): Promise<boolean> {
        return await this._userRepository.isAgent(userId);
    }
}