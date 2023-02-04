export class Booking {
    constructor(
        readonly id: number,
        readonly userId: number,
        readonly offerId: number,
        readonly startDate: Date,
        readonly endDate: Date,
    ) { }

}