import Router from "@koa/router";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BookingController } from "./booking-controller";

@injectable()
export class HTTPRouter {
    @inject(TYPES.BookingController) private _bookingController!: BookingController;

    get(): Router {
        const router = new Router();
        router.post("/booking", async (ctx) => {
            try {
                ctx.status = 201;
                ctx.body = await this._bookingController.book(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = "Bad request"
            }
        });
        router.get("/booking/:id", async (ctx) => {
            try {
                ctx.body = await this._bookingController.getBookingById(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = "Bad request"
            }
        });
        router.get("/booking", async (ctx) => {
            try {
                ctx.body = await this._bookingController.listBookings(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = "Bad request"
            }
        });
        router.get("/booking/user/:userId", async (ctx) => {
            try {
                ctx.body = await this._bookingController.getBookingByUser(ctx);
            } catch (error) {
                ctx.status = 400;
                ctx.body = "Bad request"
            }
        });
        return router;
    }
}