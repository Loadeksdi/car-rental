import { RouterContext } from "@koa/router";
import { CartService } from "../application/cart-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Cart } from "../domain/entity/cart";

@injectable()
export class CartController {
    @inject(TYPES.CartService) private _cartService!: CartService;
}