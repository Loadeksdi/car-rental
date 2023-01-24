import Router from "@koa/router";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UserController } from "./user-controller";

@injectable()
export class HTTPRouter {
    @inject(TYPES.UserController) private _userController!: UserController;

    get(): Router {
        const router = new Router();
        router.get("/user/:id", async (ctx) => {
            ctx.body = "miaou";
            //ctx.body = await this._userController.getUser(ctx.params.id);
        });
        router.get("/user/:username/exists", async (ctx) => {
            ctx.body = await this._userController.checkUserExists(ctx);
        });
        router.post("/user", async (ctx) => {
            ctx.body = await this._userController.createUser(ctx);
        });
        return router;
    }
}