import { BookingRepository as BookingRepository } from "../domain/repository/booking-repository";
import { Booking } from "../domain/entity/booking";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import ExternalCalls from "../infrastructure/external-calls";

@injectable()
export class BookingService {
    @inject(TYPES.BookingRepository) private _bookingRepository!: BookingRepository;

    async addBooking(userId: number, body: any): Promise<Booking> {
        try {
            await ExternalCalls.isUserAgent(userId);
            if (body.startDate > body.endDate || body.startDate < new Date()) {
                throw new Error("Invalid booking dates");
            }
            return await this._bookingRepository.addBooking(body);
        } catch (error) {
            // Throws if user does not exist
            throw new Error("User does not exist");
        }
    }

    async getBookingById(userId: number, bookingId: number): Promise<Booking> {
        try {
            const isAdmin = await ExternalCalls.isUserAgent(userId);
            if (!isAdmin) {
                throw new Error("Unsupported operation for user");
            }
            return await this._bookingRepository.getBookingById(bookingId);
        } catch (error) {
            throw error;
        }
    }

    async getBookingsByUser(userId: number, targetUserId: number): Promise<Booking[]> {
        try {
            const isAdmin = await ExternalCalls.isUserAgent(userId);
            if (!isAdmin) {
                throw new Error("Unsupported operation for user");
            }
            return await this._bookingRepository.getBookingsByUser(targetUserId);
        } catch (error) {
            throw error;
        }
    }

    async getAllBookings(userId: number): Promise<Booking[]> {
        try {
            const isAdmin = await ExternalCalls.isUserAgent(userId);
            if (!isAdmin) {
                throw new Error("Unsupported operation for user");
            }
            return await this._bookingRepository.getAllBookings();
        } catch (error) {
            throw error;
        }
    }

}