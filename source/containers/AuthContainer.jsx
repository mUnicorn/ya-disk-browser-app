import { connect } from "react-redux";
import View from "../views/AuthView.jsx";

export default connect(
    (state)=> {
        const token = state.token,
            authExpired = token.value && Date.now() > token.expiry;

        return {
            authExpired
        };
    }
)(View);
