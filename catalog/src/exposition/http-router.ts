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
                ctx.body = "Bad request"
            }
        });
        return router;
    }
}