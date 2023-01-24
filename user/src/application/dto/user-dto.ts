import {User} from "../../domain/entity/user"
export class UserDto {
    readonly id: number;
    readonly username: string
    readonly email: string

    constructor(user: User){
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
    }
}