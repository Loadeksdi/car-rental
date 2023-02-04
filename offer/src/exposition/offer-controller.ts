import { RouterContext } from "@koa/router";
import { OfferService } from "../application/offer-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Offer } from "../domain/entity/offer";

@injectable()
export class OfferController {
    @inject(TYPES.OfferService) private _offerService!: OfferService;

    async getOffers(ctx: RouterContext) {
        if(!ctx.headers.user){
            throw new Error('No userId header provided');
        }
        let offers: Offer[];
        try {
            offers = await this._offerService.findAllOffers(ctx.headers.user as string);
        } catch (error) {
            throw error;
        }
        return offers;
    }

    async getOffersWithCriteria(ctx: RouterContext, criteria: Object) {
        if(!ctx.headers.user){
            throw new Error('No userId header provided');
        }
        let offers: Offer[];
        try {
            offers = await this._offerService.findOffersWithCriteria(ctx.headers.user as string, criteria);
        } catch (error) {
            throw error;
        }
        return offers;
    }

    async createOffer(ctx: RouterContext): Promise<Offer> {
        if(!ctx.headers.userid){
            throw new Error('No userId header provided');
        }
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return await this._offerService.createOffer(parseInt(ctx.headers.userid as string), ctx.request.body);
        } catch (error) {
            throw error;
        }
    }
}