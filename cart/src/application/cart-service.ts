import { Cart } from "../domain/entity/cart";
import { CartRepository } from "../domain/repository/cart-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import ExternalCalls from '../infrastructure/external-calls'

@injectable()
export class CartService {
    @inject(TYPES.CartRepository) private _cartRepository!: CartRepository

    createUserCart(body: any): Cart{
        try {
            if(body.userId === undefined){
                throw new Error("userId is mandatory")
            }
            return this._cartRepository.createUserCart(body.userId);
        } catch (error) {
            throw error;
        }
    }

    getUserCart(userId: number): Cart{
        try {
            return this._cartRepository.getUserCart(userId);
        } catch (error) {
            throw error;
        }
    }

    clearUserCart(body: any): Cart{
        try {
            if(body.userId === undefined){
                throw new Error("userId is mandatory")
            }
            return this._cartRepository.clearUserCart(body.userId);
        } catch (error) {
            throw error;
        }
    }

    submitUserCart(body: any): Cart{
        try {
            if(body.userId === undefined){
                throw new Error("userId is mandatory")
            }
            return this._cartRepository.submitUserCart(body.userId);
        } catch (error) {
            throw error;
        }
    }

    addItem(body: any): Cart{
        try {
            if(body.userId === undefined){
                throw new Error("userId is mandatory")
            }
            if(body.offerId === undefined || body.startDate === undefined || body.endDate === undefined){
                throw new Error("cartItem informations are mandatory")
            }
            return this._cartRepository.addItem(body.userId, body.offerId, body.startDate, body.endDate);
        } catch (error) {
            throw error;
        }
    }

    removeItem(body: any): Cart{
        try {
            if(body.userId === undefined){
                throw new Error("userId is mandatory")
            }
            if(body.offerId === undefined){
                throw new Error("offerId is mandatory")
            }
            return this._cartRepository.removeItem(body.userId, body.offerId);
        } catch (error) {
            throw error;
        }
    }
}