import { Offer } from "../domain/entity/offer";
import { OfferRepository } from "../domain/repository/offer-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import ExternalCalls from '../infrastructure/external-calls'

@injectable()
export class OfferService {
    @inject(TYPES.OfferRepository) private _offerRepository!: OfferRepository;

    async findAllOffers(user: string): Promise<Offer[]>{
        const userExist = await ExternalCalls.isUserExist(user);
        if(!userExist){
            throw new Error("User specified does not exist");
        }
        let offers = await this._offerRepository.getOffers();
        if (!offers){
            throw new Error('No offer found');
        }
        return offers;
    }

    async findOffersWithCriteria(user: string, criteria: Object): Promise<Offer[]>{
        const userExist = await ExternalCalls.isUserExist(user);
        if(!userExist){
            throw new Error("User specified does not exist");
        }
        let offers = await this._offerRepository.getOffersWithCriteria(criteria);
        if (!offers){
            throw new Error('No offer found with your criteria');
        }
        return offers;
    }

    async createOffer(userid: number, body: any): Promise<Offer> {
        const isUserAdmin = await ExternalCalls.isUserAgent(userid);
        if(!isUserAdmin){
            throw new Error("User specified does not exist");
        }
        try {
            await this._offerRepository.registerOffer(body);
            return body as Offer;
        } catch (error) {
            throw error;
        }
    }
}