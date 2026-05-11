import axios from 'axios';

const BASE_URL =
    'https://manga-shop-backend.onrender.com';

export const createOrder =
    async (orderData) => {

        const response =
            await axios.post(
                `${BASE_URL}/orders`,
                orderData
            );

        return response.data;
    };