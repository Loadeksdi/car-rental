import Router from "@koa/router";
import { inject, injectable } from "inversify";
import { Criteria } from "types/criteria";
import { TYPES } from "../types";
import { OfferController } from "./offer-controller";

@injectable()
export class HTTPRouter {
    @inject(TYPES.OfferController) private _offerController!: OfferController;

    get(): Router {
        const router = new Router();
        router.get("/offers", async (ctx) => {
            if (!Object.keys(ctx.request.query as object).length) {
                try {
                    ctx.body = await this._offerController.getOffers(ctx);
                } catch (error) {
                    ctx.status = 404;
                    ctx.body = { message: this.getErrorMessage(error) }
                }
                return;
            }
            try {
                let criteria: Criteria = {
                    city: ctx.request.query.city ? ctx.request.query.city as string : undefined,
                    dailyPriceMin: ctx.request.query.dailyPriceMin ? parseInt(ctx.request.query.dailyPriceMin as string) : undefined,
                    dailyPriceMax: ctx.request.query.dailyPriceMax ? parseInt(ctx.request.query.dailyPriceMax as string) : undefined,
                }
                ctx.body = await this._offerController.getOffersWithCriteria(ctx, criteria);
            } catch (error) {
                ctx.status = 404;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        router.post("/offer", async (ctx) => {
            try {
                ctx.status = 201;
                ctx.body = await this._offerController.createOffer(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = { message: this.getErrorMessage(error) }
            }
        });
        return router;
    }

    getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }
}