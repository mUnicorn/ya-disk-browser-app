import { createStore, applyMiddleware, combineReducers, compose  } from "redux";
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from "redux-thunk";
import * as reducers from "./reducers";

const store = createStore(
    combineReducers(
        Object.assign(
            reducers,
            { routing: routerReducer }
        )
    ),
    compose(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;
