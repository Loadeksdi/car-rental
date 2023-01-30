import { Offer } from "../../domain/entity/offer";
import { OfferRepository } from "../../domain/repository/offer-repository";
import postgres from 'postgres'
import { injectable } from "inversify";
import type { Criteria } from "types/criteria";

@injectable()
export class OfferDatabaseRepository implements OfferRepository {
    private sql = postgres("postgres://user:example@db:5432/rental", {})

    async registerOffer(offer: Offer): Promise<void> {
        try {
            await this.sql`INSERT INTO offers(carId, city, dailyPrice) VALUES (${offer.carId}, ${offer.city}, ${offer.dailyPrice})`;
        } catch (error) {
            throw error;
        }
    };

    async getOffers(): Promise<Offer[] | undefined> {
        const offers = await this.sql<Offer[]>`SELECT * FROM offers`;
        return offers;
    }

    async getOffersWithCriteria(criteria: Criteria): Promise<Offer[] | undefined> {
        const offers = await this.sql<Offer[]>`SELECT * FROM offers ${
            criteria.city
                ? this.sql`WHERE city = ${criteria.city}`
                : this.sql`WHERE TRUE = TRUE`
        } ${
            criteria.dailyPriceMax
                ? this.sql`AND dailyprice <= ${criteria.dailyPriceMax}`
                : this.sql`AND TRUE = TRUE`
        } ${
            criteria.dailyPriceMin
                ? this.sql`AND dailyprice >= ${criteria.dailyPriceMin}`
                : this.sql`AND TRUE = TRUE`
        }`;
        return offers;
    }

}