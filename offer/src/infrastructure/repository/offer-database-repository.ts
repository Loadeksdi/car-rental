import { Offer } from "../../domain/entity/offer";
import { OfferRepository } from "../../domain/repository/offer-repository";
import postgres from 'postgres'
import { injectable } from "inversify";
import type { Criteria } from "types/criteria";

@injectable()
export class OfferDatabaseRepository implements OfferRepository {
    private sql = postgres(process.env.DB_CONNECTION_URL || "", {})

    async registerOffer(offer: Offer): Promise<Offer> {
        try {
            const [newOffer]: [Offer] = await this.sql`INSERT INTO offers (carId, city, dailyPrice) VALUES (${offer.carId}, ${offer.city}, ${offer.dailyPrice}) RETURNING *`;
            return newOffer;
        } catch (error) {
            throw error;
        }
    };

    async getOffers(): Promise<Offer[] | undefined> {
        const offers = await this.sql<Offer[]>`SELECT * FROM offers JOIN cars ON offers.carid = cars.id`;
        return offers;
    }

    async getOffersWithCriteria(criteria: Criteria): Promise<Offer[] | undefined> {
        const offers = await this.sql<Offer[]>`SELECT * FROM offers JOIN cars ON offers.carid = cars.id ${criteria.city
            ? this.sql`WHERE city = ${criteria.city}`
            : this.sql`WHERE TRUE = TRUE`
            } ${criteria.dailyPriceMax
                ? this.sql`AND dailyprice <= ${criteria.dailyPriceMax}`
                : this.sql`AND TRUE = TRUE`
            } ${criteria.dailyPriceMin
                ? this.sql`AND dailyprice >= ${criteria.dailyPriceMin}`
                : this.sql`AND TRUE = TRUE`
            }`;
        return offers;
    }

}