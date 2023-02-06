import { BookingRepository } from "../../domain/repository/booking-repository";
import postgres from 'postgres'
import { injectable } from "inversify";
import { Booking } from "../../domain/entity/booking";
require('dotenv').config()
@injectable()
export class BookingDatabaseRepository implements BookingRepository {

    private sql = postgres(process.env.DB_CONNECTION_URL || "", {})

    async getBookingsByUser(userId: number): Promise<Booking[]> {
        return await this.sql<Booking[]>`SELECT * FROM bookings WHERE userId = ${userId}`;
    }

    async getBookingById(bookingId: number): Promise<Booking> {
        const [booking]: [Booking?] = await this.sql`SELECT * FROM bookings WHERE id = ${bookingId}`;
        if (!booking) {
            throw new Error(`Booking with id ${bookingId} not found`);
        }
        return booking;
    }

    async getAllBookings(): Promise<Booking[]> {
        return await this.sql<Booking[]>`SELECT * FROM bookings`;
    }

    async addBooking(booking: Booking): Promise<Booking> {
        try {
            const [newBooking]: [Booking] = await this.sql`INSERT INTO bookings (userId, offerId, startDate, endDate) VALUES (${booking.userId}, ${booking.offerId}, ${booking.startDate}, ${booking.endDate}) RETURNING *`;
            return newBooking;
        } catch (error) {
            throw error;
        }
    }
}