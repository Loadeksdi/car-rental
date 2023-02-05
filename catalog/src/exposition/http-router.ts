import Router from "@koa/router";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { CatalogController } from "./catalog-controller";

@injectable()
export class HTTPRouter {
    @inject(TYPES.CatalogController) private _catalogController!: CatalogController;

    get(): Router {
        const router = new Router();
        router.post("/catalog", async (ctx) => {
            try {
                ctx.status = 201;
                ctx.body = await this._catalogController.createCar(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.get("/catalog/:id", async (ctx) => {
            try {
                ctx.body = await this._catalogController.getCar(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.get("/catalog", async (ctx) => {
            try {
                ctx.body = await this._catalogController.listCars(ctx);
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