import { RouterContext } from "@koa/router";
import { CatalogService } from "../application/catalog-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class CatalogController {
    @inject(TYPES.CatalogService) private _catalogService! : CatalogService;

    async createCar(ctx: RouterContext) {
        if(!ctx.headers.userid){
            throw new Error('No userId header provided');
        }
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return await this._catalogService.addCarToCatalog(parseInt(ctx.headers.userid as string), ctx.request.body);
        } catch (error) {
            throw error;
        }
    }

    async listCars(ctx: RouterContext) {
        if(!ctx.headers.username){
            throw new Error('No userid header provided');
        }
        if(ctx.headers.username instanceof Array){
            throw new Error('Multiple userid headers provided');
        }
        try {
            return await this._catalogService.getCarsFromCatalog(ctx.headers.username);
        } catch (error) {
            throw error;
        }
    }

    async getCar(ctx: RouterContext) {
        if(!ctx.headers.username){
            throw new Error('No userid header provided');
        }
        if(ctx.headers.username instanceof Array){
            throw new Error('Multiple userid headers provided');
        }
        if (!ctx.params.id) {
            throw new Error('No id provided');
        }
        try {
            return await this._catalogService.getCarFromCatalog(ctx.headers.username, parseInt(ctx.params.id));
        } catch (error) {
            throw error;
        }
    }
}