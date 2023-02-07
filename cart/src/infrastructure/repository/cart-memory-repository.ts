import { Cart } from "../../domain/entity/cart";
import { CartItem } from "../../domain/entity/cart-item"
import { CartRepository } from "../../domain/repository/cart-repository";
import { injectable } from "inversify";

@injectable()
export class CartMemoryRepository implements CartRepository {
    private static carts: Cart[] = [];
    private static cartCounter = 0;

    createUserCart(userId: number): Cart{
        if(this.isUserAlreadyHavingAPendingCart(userId)){
            throw new Error(`User ${userId} already have a pending cart`);
        }
        const newCart = new Cart(CartMemoryRepository.cartCounter, userId, "pending", [])
        CartMemoryRepository.carts.push(newCart);
        return newCart;
    }

    getUserCart(userId: number): Cart{
        const cart = CartMemoryRepository.carts.find((c) => c.userId === userId && c.status === "pending");
        if(!cart){
            throw new Error(`User ${userId} does not have any pending cart`);
        }
        return cart;
    }

    clearUserCart(userId: number): Cart{
        const cartIndex = CartMemoryRepository.carts.findIndex((c) => c.userId === userId && c.status === "pending");
        if (cartIndex === -1) {
            throw new Error(`User ${userId} does not have any pending cart`);
        }
        CartMemoryRepository.carts[cartIndex] = {
            ...CartMemoryRepository.carts[cartIndex],
            cartItems: [],
        };
        return CartMemoryRepository.carts[cartIndex];
    }

    submitUserCart(userId: number): Cart{
        const cartIndex = CartMemoryRepository.carts.findIndex((c) => c.userId === userId && c.status === "pending");
        if (cartIndex === -1) {
            throw new Error(`User ${userId} does not have any pending cart`);
        }
        CartMemoryRepository.carts[cartIndex] = {
            ...CartMemoryRepository.carts[cartIndex],
            status: "submited",
        };
        return CartMemoryRepository.carts[cartIndex];
    }

    addItem(userId: number, itemId: number): Cart{
        const cartIndex = CartMemoryRepository.carts.findIndex((c) => c.userId === userId && c.status === "pending");
        if (cartIndex === -1) {
            throw new Error(`User ${userId} does not have any pending cart`);
        }
        CartMemoryRepository.carts[cartIndex] = {
            ...CartMemoryRepository.carts[cartIndex],
            cartItems: [
              ...CartMemoryRepository.carts[cartIndex].cartItems,
              itemId,
            ],
        };
        return CartMemoryRepository.carts[cartIndex];
    }

    removeItem(userId: number, itemId: number): Cart{
        const cartIndex = CartMemoryRepository.carts.findIndex((c) => c.userId === userId && c.status === "pending");
        if (cartIndex === -1) {
            throw new Error(`User ${userId} does not have any pending cart`);
        }
        CartMemoryRepository.carts[cartIndex] = {
            ...CartMemoryRepository.carts[cartIndex],
            cartItems: CartMemoryRepository.carts[cartIndex].cartItems.filter((i) => i !== itemId),
        };
        return CartMemoryRepository.carts[cartIndex];
    }

    isUserAlreadyHavingAPendingCart(userId: number): boolean{
        return CartMemoryRepository.carts.some((c) => c.userId === userId && c.status === "pending");
    }
}