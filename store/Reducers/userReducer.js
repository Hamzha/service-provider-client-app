import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../Utility/utility';

// States
const initialState = {
    refresh_token: null,
    access_token: null,
    time_added: null,
    registeration_data:{
        email:'',
        password:'',
        phone_number:'',
        first_name:'',
        last_name:'',
        home_address:'',
        street_address:'',
        country:"United States",
        countryCode:'US',
        state:'',
        city:'',
        zip_code:'',
        user_type:'client',
        with_out_code_phone_number:''
    },
    user_data:null,
    location:null
};


// Functions for Updating the state
const login = (state, action) => {
    return updateObject(state, {
        refresh_token: action.refresh_token,
        access_token: action.access_token,
        time_added: action.time_added
    });
};

const register_user = (state, action) => {
    var new_register_data=updateObject(state.registeration_data,action.data);
    return updateObject(state, {
        registeration_data: new_register_data
    });
};

const user_data = (state, action) => {
    return updateObject(state, {
        user_data: action.user_data
    });
};

const update_location = (state, action) => {
    return updateObject(state, {
        location: action.data
    });
};


// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.login: return login(state, action);
        case actionTypes.register_user: return register_user(state, action);
        case actionTypes.USER_DATA: return user_data(state, action);
        case actionTypes.UPDATE_LOCATION: return update_location(state, action);
        default:
            return state;
    }
};
export default reducer;