import {
    SET_TOKEN,
    RESET_TOKEN
} from "./actionTypes.js";

const setToken = ({ token, maxAge })=> ({
    type: SET_TOKEN,
    token,
    maxAge
});

const resetToken = ()=> ({
    type: RESET_TOKEN
})

export { setToken, resetToken };
