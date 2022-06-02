import { OTP_GENERATE_URL, OTP_VALIDATE_URL } from '../Constants/constants.js';
import axios from 'axios';


export const generateOtp = async (data) => {
    try {
        const response = await axios({
            method: 'post',
            timeout: 60000,
            url: OTP_GENERATE_URL,
            data: data
        });
        return { data: response.data.data.data, status: 200 }
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
        if ((status == 400 || status == 401 || status == 404) && typeof response === 'object')
            return { data: error.response.data.exceptionString[0], status: status }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while generating otp", status: status }
    }
}

export const validateOtp = async (data) => {
    try {
        const response = await axios({
            method: 'post',
            timeout: 60000,
            url: OTP_VALIDATE_URL,
            data: data
        });
        return { data: response.data.data.data, status: 200 }
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
        if ((status == 400 || status == 401 || status == 404) && typeof response === 'object')
            return { data: error.response.data.exceptionString[0], status: status }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while generating otp", status: status }
    }
}

