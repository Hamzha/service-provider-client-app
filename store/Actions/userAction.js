import * as actionTypes from './actionTypes';

export const login = (access_token, refresh_token, time_added) => {
    return {
        type: actionTypes.login,
        access_token: access_token,
        refresh_token: refresh_token,
        time_added: time_added
    };
};

export const register_user = (data) => {
    return {
        type: actionTypes.register_user,
        data: data
    };
};

export const user_data = (user_data) => {
    return {
        type: actionTypes.USER_DATA,
        user_data: user_data
    };
}

export const update_location=(data)=>{
    return {
        type: actionTypes.UPDATE_LOCATION,
        data: data
    };
}