import { GET_ALL_SERVICE_CATEGORY_URL } from '../Constants/constants.js';
import axios from 'axios';

export const getAllServiceCategory = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            timeout: 60000,
            headers: {
                Authorization: "Bearer " + token
            },
            url: `${GET_ALL_SERVICE_CATEGORY_URL}`
        });
        return { data: response.data.data, status: 200 }
    }
    catch (error) {
        // ------ If timeout error ------
        if (error.code == 'ECONNABORTED' && error.message)
            return { data: error.message, status: null }

        // ------ If request is not reached to the server ------
        if (error.message == 'Network Error')
            return { data: "Unable to connect to server because of network error", status: null }

        const status = error.response.status;
        const response = error.response.data
        // ------ Handling request that is send from server  ------
        if ((status == 400 || status == 404) && typeof response === 'object')
            return { data: error.response.data.exceptionString[0], status: status }

        if (status == 401)
            return { data: "Session Expired please login again", status: status }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while getting Service", status: status }
    }
}
