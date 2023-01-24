export class User {
    constructor(
        readonly id: string,
        readonly username: string,
        private readonly password: string,
        readonly email: string,
    ) {}



}