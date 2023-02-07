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
}