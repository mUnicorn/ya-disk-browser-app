import { Provider } from "react-redux";
import store from "./store.js";
import Routes from "./routes.jsx";

function init({ container } = {}) {
    if (!container) {
        container = document.createElement("div");
        document.body.appendChild(container);
    }

    ReactDOM.render(
        <Provider store={store}>
            <Routes getState={store.getState} dispatch={store.dispatch} />
        </Provider>,
        container
    );
}

init();
