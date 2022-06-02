import * as actionTypes from './actionTypes';
export const set_state=(data)=>{
    return {
        type: actionTypes.SET_STATE,
        data: data
    };
}
