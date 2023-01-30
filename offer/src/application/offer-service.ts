import { Offer } from "../domain/entity/offer";
import { OfferRepository } from "../domain/repository/offer-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class OfferService {
    @inject(TYPES.OfferRepository) private _offerRepository!: OfferRepository;

    async findAllOffers(): Promise<Offer[]>{
        let offers = await this._offerRepository.getOffers();
        if (!offers){
            throw new Error('No offer found');
        }
        return offers;
    }

    async findOffersWithCriteria(criteria: Object): Promise<Offer[]>{
        let offers = await this._offerRepository.getOffersWithCriteria(criteria);
        if (!offers){
            throw new Error('No offer found with your criteria');
        }
        return offers;
    }

    async createOffer(body: any): Promise<Offer> {
        try {
            await this._offerRepository.registerOffer(body);
            return body as Offer;
        } catch (error) {
            throw error;
        }
    }
}