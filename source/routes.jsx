import { Router, Route, IndexRoute, Redirect, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import store from "./store.js";
import { setToken } from "./actions/authActions.js";
import Root from "./containers/RootContainer.jsx";
import Auth from "./containers/AuthContainer.jsx";
import Dashboard from "./containers/DashboardContainer.jsx";

const Routes = ({ getState, dispatch })=> {
    const authValidation = (nextState, replace, callback)=> {
        const state = getState(),
            { content: authorized, expiry } = state.token;

        if (!authorized || Date.now() > expiry) {
            const tokenHash = /access_token=([-0-9a-zA-Z_]+)/.exec(document.location.hash),
                token = tokenHash && tokenHash[1];

            if (token) {
                const maxAge = Number(/expires_in=(.*)/.exec(document.location.hash)[1]);

                dispatch(setToken({ token, maxAge }));
                callback();
                browserHistory.push("/");
            }
            else
                browserHistory.push("/not-auth");
        }
    };

    return (
        <Router history={syncHistoryWithStore(browserHistory, store)}>
            <Route path="/" component={Root}>
                <IndexRoute component={Dashboard} onEnter={authValidation}/>
                <Route path="/not-auth" component={Auth} />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    );
};

export default Routes;
