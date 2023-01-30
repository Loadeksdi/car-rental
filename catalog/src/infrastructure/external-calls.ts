import axios from 'axios';

export default class ExternalCalls {
    static async isUserAgent(userId: number): Promise<boolean> {
        try {
            const response = await axios.get(`http://user:3000/user/${userId}/isAgent`)
            return response.data;
        } catch (error) {
            throw new Error('Call to user service failed');
        }
    }

    static async doesUserExist(username: string): Promise<boolean> {
        try {
            const response = await axios.get(`http://user:3000/user/${username}/exists`)
            return response.data;
        } catch (error) {
            throw new Error('Call to user service failed');
        }
    }
}