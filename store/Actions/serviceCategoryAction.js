import * as actionTypes from './actionTypes';
export const update_service_Category=(data)=>{
    return {
        type: actionTypes.UPDATE_SERVICE_CATEGORY,
        data: data
    };
}
