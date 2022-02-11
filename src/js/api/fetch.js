import { requestToAPI } from './api'

const axios = require('axios');

export async function request(searchFor) {
    try {
        const response = await axios.get(requestToAPI.getRequestURL(searchFor));
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}
