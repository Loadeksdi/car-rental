import { Cart } from "../domain/entity/cart";
import { CartRepository } from "../domain/repository/cart-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import ExternalCalls from '../infrastructure/external-calls'

@injectable()
export class CartService {
    @inject(TYPES.CartRepository) private _cartRepository!: CartRepository

}