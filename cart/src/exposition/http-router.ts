import Router from "@koa/router";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { CartController } from "./cart-controller";

@injectable()
export class HTTPRouter {
    @inject(TYPES.CartController) private _cartController!: CartController;

    get(): Router {
        const router = new Router();
        return router;
    }

    getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }
}