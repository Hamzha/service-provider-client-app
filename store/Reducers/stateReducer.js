import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../Utility/utility';
// States
const initialState = {
    token_expired_error:null
};


const set_state = (state, action) => {
    return updateObject(state, action.data);
}
// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATE: return set_state(state, action);
        default:
            return state;
    }
};
export default reducer;