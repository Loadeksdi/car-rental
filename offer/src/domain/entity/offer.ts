export class Offer {
    constructor(
        readonly id: number,
        readonly carId: number,
        readonly city: string,
        readonly dailyPrice: number
    ) {}
}