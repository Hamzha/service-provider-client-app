import { LEAD_URL} from '../Constants/constants.js';
import axios from 'axios';
import { object_to_string } from '../../HelperFunction/helpers'



export const createLeadApi = async (data,token) => {

    try {
        const response = await axios({
            method: 'post',
            data: data,
            timeout: 60000,
            url: LEAD_URL,
            headers: {
                Authorization: "Bearer " + token
            },
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

        if (status==401)
            return { data: "Session Expired please login again", status: status }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while creating lead", status: status }
    }
}
