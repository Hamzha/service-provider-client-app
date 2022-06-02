import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../Utility/utility';
// States
const initialState = {
    serviceCategories:null
};


const update_service_category = (state, action) => {
    return updateObject(state, {serviceCategories:action.data});
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_SERVICES: return update_service_category(state, action);
        default:
            return state;
    }
};
export default reducer;