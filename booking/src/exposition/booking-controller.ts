import { RouterContext } from "@koa/router";
import { BookingService } from "../application/booking-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class BookingController {
    @inject(TYPES.BookingService) private _bookingService!: BookingService;

    async book(ctx: RouterContext) {
        if (!ctx.headers.userid) {
            throw new Error('No userId header provided');
        }
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return await this._bookingService.addBooking(parseInt(ctx.headers.userid as string), ctx.request.body);
        } catch (error) {
            throw error;
        }
    }

    async listBookings(ctx: RouterContext) {
        if (!ctx.headers.userid) {
            throw new Error('No userId header provided');
        }
        try {
            return await this._bookingService.getAllBookings(parseInt(ctx.headers.userid as string));
        } catch (error) {
            throw error;
        }
    }

    async getBookingById(ctx: RouterContext) {
        if (!ctx.headers.userid) {
            throw new Error('No userId header provided');
        }
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        if (!ctx.params.id) {
            throw new Error('No id provided');
        }
        try {
            return await this._bookingService.getBookingById(parseInt(ctx.headers.userid as string), parseInt(ctx.params.id));
        } catch (error) {
            throw error;
        }
    }

    async getBookingByUser(ctx: RouterContext) {
        if (!ctx.headers.userid) {
            throw new Error('No userId header provided');
        }
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        if (!ctx.params.userId) {
            throw new Error('No userId provided');
        }
        try {
            return await this._bookingService.getBookingsByUser(parseInt(ctx.headers.userid as string), parseInt(ctx.params.userId));
        } catch (error) {
            throw error;
        }
    }

}