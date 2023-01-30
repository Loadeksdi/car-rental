import { Offer } from "../entity/offer";

export interface OfferRepository {

    registerOffer(offer: Offer): Promise<void>;

    getOffers(): Promise<Offer[] | undefined>;

    getOffersWithCriteria(criteria: Object): Promise<Offer[] | undefined>;

}