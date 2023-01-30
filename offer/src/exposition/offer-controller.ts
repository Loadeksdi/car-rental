import { RouterContext } from "@koa/router";
import { OfferService } from "../application/offer-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Offer } from "../domain/entity/offer";

@injectable()
export class OfferController {
    @inject(TYPES.OfferService) private _offerService!: OfferService;

    async getOffers() {
        let offers: Offer[];
        try {
            offers = await this._offerService.findAllOffers();
        } catch (error) {
            throw error;
        }
        return offers;
    }

    async getOffersWithCriteria(criteria: Object) {
        let offers: Offer[];
        try {
            offers = await this._offerService.findOffersWithCriteria(criteria);
        } catch (error) {
            throw error;
        }
        return offers;
    }

    async createOffer(ctx: RouterContext): Promise<Offer> {
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            const offer = await this._offerService.createOffer(ctx.request.body);
            return new Offer(offer.id, offer.carId, offer.city, offer.dailyPrice);
        } catch (error) {
            throw error;
        }
    }
}