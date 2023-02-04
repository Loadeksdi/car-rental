import { Booking } from "../entity/booking";

export interface BookingRepository {

    getBookingsByUser(userId: number): Promise<Booking[]>;

    getBookingById(bookingId: number): Promise<Booking>;

    getAllBookings(): Promise<Booking[]>;

    addBooking(booking: Booking): Promise<Booking>;

}