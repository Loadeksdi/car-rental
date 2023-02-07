import Router from "@koa/router";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { CartController } from "./cart-controller";

@injectable()
export class HTTPRouter {
    @inject(TYPES.CartController) private _cartController!: CartController;

    get(): Router {
        const router = new Router();
        router.post("/cart", async (ctx) => {
            try {
                ctx.status = 201;
                ctx.body = await this._cartController.createUserCart(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.get("/cart/user/:id", async (ctx) => {
            try {
                ctx.body = this._cartController.getUserCart(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.patch("/cart/clear", async (ctx) => {
            try {
                ctx.status = 200;
                ctx.body = this._cartController.clearUserCart(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.patch("/cart/submit", async (ctx) => {
            try {
                ctx.status = 200;
                ctx.body = this._cartController.submitUserCart(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.patch("/cart/add", async (ctx) => {
            try {
                ctx.status = 200;
                ctx.body = this._cartController.addItem(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.patch("/cart/remove", async (ctx) => {
            try {
                ctx.status = 200;
                ctx.body = this._cartController.removeItem(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        return router;
    }

    getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }
}