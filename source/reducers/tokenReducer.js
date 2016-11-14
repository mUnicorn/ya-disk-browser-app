import {
    SET_TOKEN,
    RESET_TOKEN
} from "../actions/actionTypes.js";

const initialState = { content: "", expiry: 0 };

function token(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                content: action.token,
                expiry: Date.now() + action.maxAge
            };
        case RESET_TOKEN:
            return initialState;
    }

    return state
}

export { token };
