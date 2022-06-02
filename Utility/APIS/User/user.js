import { LOGIN_URL, REGISTER_URL, VALIDATE_IF_USER_EXIST_URL,GET_USER_URL,UPDATE_USER_URL } from '../Constants/constants.js';
import axios from 'axios';
import { object_to_string } from '../../HelperFunction/helpers'

export const login = async (data) => {
    data.email = data.email.toLowerCase();
    data.email = data.email.trim();
    try {
        const response = await axios({
            method: 'post',
            data: data,
            timeout: 60000,
            url: LOGIN_URL
        });
        return { data: response.data, status: 200 }
    }
    catch (error) {
        const status = error.response.status;
        const response = error.response.data
        // ------ If request is not reached to the server ------
        if (error.message == 'Network Error')
            return { data: "Unable to connect to server because of network error", status: null }

        // ------ Handling request that is send from server  ------
        if (status == 400 && typeof response === 'object') {
            var keys = Object.keys(response)
            return { data: response[keys[0]][0], status: status }
        }

        // ------ If credential are wrong  ------
        if (status == 401) {
            return { data: response.detail, status: status }
        }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while authenticating", status: error.response.status }
    }
}

export const registerUser = async (data) => {
    data.email = data.email.toLowerCase();
    data.email = data.email.trim();
    try {
        const response = await axios({
            method: 'post',
            data: data,
            timeout: 60000,
            url: REGISTER_URL
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
        return { data: "Something went wrong while registering user", status: status }
    }
}

export const validateIfUserExist = async (data) => {
    try {
        const response = await axios({
            method: 'get',
            timeout: 60000,
            url: `${VALIDATE_IF_USER_EXIST_URL}?email=${data.email}&phone_number=${data.phone_number}`
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
        return { data: "Something went wrong while registering user", status: status }
    }
}

export const getUser = async (token,params={}) => {
    const params_string = object_to_string(params);
    try {
        const response = await axios({
            method: 'get',
            timeout: 60000,
            headers: {
                Authorization: "Bearer " + token
            },
            url: `${GET_USER_URL}?${params_string}`
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
        if ((status == 400  || status == 404) && typeof response === 'object')
            return { data: error.response.data.exceptionString[0], status: status }

        if (status==401)
            return { data: "Session Expired please login again", status: status }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while registering user", status: status }
    }
}

export const updateUser = async (data,token) => {
    try {
        const response = await axios({
            method: 'put',
            data: data,
            timeout: 60000,
            url: UPDATE_USER_URL,
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
        return { data: "Something went wrong while updating user", status: status }
    }
}
