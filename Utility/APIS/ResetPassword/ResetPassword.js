import { RESET_PASSWORD_REQUEST_URL,RESET_PASSWORD_CONFIRM_URL } from '../Constants/constants.js';
import axios from 'axios';


export const resetPasswordRequest = async (data) => {
    try {
        var bodyFormData = new FormData();
        bodyFormData.append('email', data.email);
        const response = await axios({
            method: 'POST',
            // timeout: 60000,
            url: RESET_PASSWORD_REQUEST_URL,
            data: bodyFormData,
            headers:{"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"}
        });
        return { data: response.data, status: 200 }
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
        if (status == 400 && typeof response === 'object') {
            var keys = Object.keys(response)
            return { data: response[keys[0]][0], status: status }
        }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while sending password reset request", status: status }
    }
}


export const resetPasswordConfirm = async (data) => {
    try {
        var bodyFormData = new FormData();
        bodyFormData.append('password', data.password);
        bodyFormData.append('token', data.otp);
        const response = await axios({
            method: 'post',
            timeout: 60000,
            url: RESET_PASSWORD_CONFIRM_URL,
            headers:{"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"},
            data: bodyFormData
        });

        return { data: {status:"ok"}, status: 200 }
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
        if ((status == 400 || status==404) && typeof response === 'object') {
            var keys = Object.keys(response)
            return { data: response[keys[0]], status: status }
        }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while reseting password", status: status }
    }
}
