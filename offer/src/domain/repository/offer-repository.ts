import { Offer } from "../entity/offer";

export interface OfferRepository {

    registerOffer(offer: Offer): Promise<Offer>;

    getOffers(): Promise<Offer[] | undefined>;

    getOffersWithCriteria(criteria: Object): Promise<Offer[] | undefined>;

}