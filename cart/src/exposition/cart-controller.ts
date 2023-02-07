import { RouterContext } from "@koa/router";
import { CartService } from "../application/cart-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Cart } from "../domain/entity/cart";

@injectable()
export class CartController {
    @inject(TYPES.CartService) private _cartService!: CartService;

    createUserCart(ctx: RouterContext) {
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return this._cartService.createUserCart(ctx.request.body);
        } catch (error) {
            throw error;
        }
    }

    getUserCart(ctx: RouterContext) {
        if (!ctx.params.id) {
            throw new Error('No id provided');
        }
        try {
            return this._cartService.getUserCart(parseInt(ctx.params.id));
        } catch (error) {
            throw error;
        }
    }

    clearUserCart(ctx: RouterContext) {
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return this._cartService.clearUserCart(ctx.request.body);
        } catch (error) {
            throw error;
        }
    }

    async submitUserCart(ctx: RouterContext) {
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return await this._cartService.submitUserCart(ctx.request.body);
        } catch (error) {
            throw error;
        }
    }

    addItem(ctx: RouterContext) {
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return this._cartService.addItem(ctx.request.body);
        } catch (error) {
            throw error;
        }
    }

    removeItem(ctx: RouterContext) {
        if (!ctx.request.body) {
            throw new Error('No body provided');
        }
        try {
            return this._cartService.removeItem(ctx.request.body);
        } catch (error) {
            throw error;
        }
    }
}