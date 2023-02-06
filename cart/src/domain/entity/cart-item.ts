export class CartItem {
    constructor(
        readonly id: number,
        readonly cartId: number,
        readonly offerId: number,
        readonly startDate: Date,
        readonly endDate: Date
    ) {}
}