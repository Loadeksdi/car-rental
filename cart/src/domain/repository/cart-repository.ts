import { Cart } from "../entity/cart";
import { CartItem } from "../entity/cart-item";

export interface CartRepository {
    createUserCart(userId: number): Cart;
    getUserCart(userId: number): Cart;
    clearUserCart(userId: number): Cart;
    submitUserCart(userId: number): Cart;
    addItem(userId: number, offerId: number, startDate: Date, endDate: Date): Cart;
    removeItem(userId: number, offerId: Number): Cart;
    isUserAlreadyHavingAPendingCart(userId: number): boolean;
}