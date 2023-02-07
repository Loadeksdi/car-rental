import axios from 'axios';
import { Booking } from 'domain/entity/booking';
import nodemailer from 'nodemailer';
export default class ExternalCalls {
    static async isUserExist(username: string): Promise<boolean> {
        try {
            const response = await axios.get(`http://user:3000/user/${username}/exists`)
            return response.data;
        } catch (error) {
            throw new Error('Call to user service failed');
        }
    }

    static async isUserAgent(userId: number): Promise<boolean> {
        try {
            const response = await axios.get(`http://user:3000/user/${userId}/isAgent`)
            return response.data;
        } catch (error) {
            throw new Error('Call to user service failed');
        }
    }

    static async getUserInfo(userId: number): Promise<any> {
        try {
            const response = await axios.get(`http://user:3000/user/${userId}`)
            return response.data;
        } catch (error) {
            throw new Error('Call to user service failed');
        }
    }

    static async sendBookingConfirmation(userId: number, booking: Booking): Promise<void> {
        const testAccount = await nodemailer.createTestAccount();

        // Using fake mail transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const user = await this.getUserInfo(userId);
        
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Car-Rental Service" <car.rental@example.com>',
            to: `${user.email}`,
            subject: `Your rental is confirmed ✔`,
            text: `Hello ${user.username}, we are happy to confirm your booking n°${booking.id} from ${(booking as any).startdate.toString()} to ${(booking as any).enddate.toString()}. Feel free to contact us if you have any questions.`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}