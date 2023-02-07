import { CartItem } from "./cart-item";

export class Cart {
    constructor(
        readonly id: number,
        readonly userId: number,
        readonly status: string,
        readonly cartItems: number[]
    ) {}
}