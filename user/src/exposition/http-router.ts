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
            try {
                ctx.body = await this._userController.getUser(ctx.params.id);
            } catch(error){
                ctx.status = 404;
                ctx.body = "User not found";
            }
        });
        router.get("/user/:username/exists", async (ctx) => {
            ctx.body = await this._userController.checkUserExists(ctx);
        });
        router.post("/user", async (ctx) => {
            try {
                ctx.status = 201;
                ctx.body = await this._userController.createUser(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = "Bad request"
            }
        });
        return router;
    }
}