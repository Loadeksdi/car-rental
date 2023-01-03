import { RouterContext } from "@koa/router";
import { UserService } from "application/user-service";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class UserController {
    @inject(TYPES.UserService) private _userService!: UserService;

    async getUser(id: string) {
        return await this._userService.findUser(id);
    }

    async checkUserExists(ctx: RouterContext) {
        return await this._userService.checkUserExists(ctx.params.username);
    }

    async createUser(ctx: RouterContext) {
        if (!ctx.request.body) {
            return;
        }
        return await this._userService.createUser(ctx.request.body);
    }
}