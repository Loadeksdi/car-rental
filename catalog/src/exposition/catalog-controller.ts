import { RouterContext } from "@koa/router";
import { CatalogService } from "../application/catalog-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class CatalogController {
    @inject(TYPES.CatalogService) private _catalogService! : CatalogService;

    async createCar(ctx: RouterContext) {
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            const catalog = await this._catalogService.createCar(ctx.request.body);
        } catch (error) {
            throw error;
        }
    }
}