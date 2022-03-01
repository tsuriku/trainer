import { createAction, handleActions } from "redux-actions";
import { Record } from "immutable";

const SET_MESSAGE = "viakissKeyboardPattern/SET_MESSAGE";

export const setMessage = createAction(SET_MESSAGE)

const initialState = Record({
    message: ""
})();

export default handleActions({
    [SET_MESSAGE]: (state, { payload: message }) => {
        return state.set("message", message)
    }
}, initialState)