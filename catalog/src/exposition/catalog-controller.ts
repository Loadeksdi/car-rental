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
        let username;
        try {
            username = this.validateHeaders(ctx);
        } catch (error) {
            throw error;
        }
        try {
            return await this._catalogService.getCarsFromCatalog(username);
        } catch (error) {
            throw error;
        }
    }

    async getCar(ctx: RouterContext) {
        let username;
        try {
            username = this.validateHeaders(ctx);
        } catch (error) {
            throw error;
        }
        if (!ctx.params.id) {
            throw new Error('No id provided');
        }
        try {
            return await this._catalogService.getCarFromCatalog(username, parseInt(ctx.params.id));
        } catch (error) {
            throw error;
        }
    }

    private validateHeaders(ctx: RouterContext): string {
        if(!ctx.headers.user){
            throw new Error('No user header provided');
        }
        if(ctx.headers.user instanceof Array){
            throw new Error('Multiple user headers provided');
        }
        return ctx.headers.user;
    }
}