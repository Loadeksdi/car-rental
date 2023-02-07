import axios from 'axios';
import { Cart } from '../domain/entity/cart';

export default class ExternalCalls {
    static async createBookingFromCart(userId: number, cart: Cart): Promise<void> {
        try {
            for(let i = 0; i < cart.cartItems.length; i++){
                const response = await axios.post(`http://booking:3004/booking`, {
                    userId: userId,
                    offerId: cart.cartItems[i].offerId,
                    startDate: cart.cartItems[i].startDate,
                    endDate: cart.cartItems[i].endDate,
                },
                {
                    headers: {
                        userid: userId
                    }
                })
            }
        } catch (error) {
            throw new Error('Call to booking service failed');
        }
    }

    static async callPaymentService(): Promise<boolean> {
        try {
            /** Implement the call to the payment provider when the decision is made*/
            return true;
        } catch (error) {
            throw new Error('Call to payment provider failed');
        }
    }
}