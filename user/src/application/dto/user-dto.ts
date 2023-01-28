import {User} from "../../domain/entity/user"
export class UserDto {
    readonly id: number;
    readonly username: string
    readonly email: string
    readonly role: string

    constructor(user: User){
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.role = user.role
    }
}