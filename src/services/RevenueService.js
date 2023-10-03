import axios from "axios";

export default {
    async getOrderSale(filter, month) {
        try {
            const response = await axios.get(`http://localhost:3000/orderSale`);
            const result = response.data;
        } catch (error) {
            console.error('Error fetching order sale data:', error);
        }
    }
};

