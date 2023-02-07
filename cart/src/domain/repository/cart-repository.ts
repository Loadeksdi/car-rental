import { Cart } from "../entity/cart";
import { CartItem } from "../entity/cart-item";

export interface CartRepository {
    createUserCart(userId: number): Cart;
    getUserCart(userId: number): Cart;
    clearUserCart(userId: number): Cart;
    submitUserCart(userId: number): Cart;
    addItem(userId: number, itemId: number): Cart;
    removeItem(userId: number, itemId: Number): Cart;
    isUserAlreadyHavingAPendingCart(userId: number): boolean;
}