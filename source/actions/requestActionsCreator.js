import deepEqual from "deep-equal";
import RESTcall from "../rest/REST-call.js";
import { resetToken } from "./authActions.js";

const pendingActionCreator = ({ actionTypes, stateRequest })=> ({
    type: actionTypes.pending,
    stateRequest
});

const successActionCreator = ({ actionTypes, stateRequest, content, maxAge })=> ({
    type: actionTypes.success,
    stateRequest,
    content,
    maxAge
});

const failureActionCreator = ({ actionTypes, stateRequest, error })=> ({
    type: actionTypes.failure,
    stateRequest,
    error
});

const shouldStart = (state, stateRequest)=> {
    for (let storedRequest of state.requests.keys()) {
        if (deepEqual(stateRequest, storedRequest)) {
            stateRequest = storedRequest;
            break;
        }
    }

    const storedRequestData = state.requests.get(stateRequest);

    return (
        !storedRequestData
        || (
            storedRequestData.status != "pending"
            && Date.now() > storedRequestData.expiry
        )
    );
};

const defaultMappingResponse = ({ response })=> ({ response });

function requestActionCreator({
    actionTypes,
    url,
    stateRequest,
    stateKey,
    method = "GET",
    headers = {},
    data = {},
    maxAge = 300000,
    mapResponse = defaultMappingResponse
}) {
    return (dispatch, getState) => {
        const state = getState(),
            token = state.token;

        if (!token.content || Date.now() > token.expiry)
            return dispatch(resetToken());

        if (!stateRequest)
            stateRequest = data;

        if (!shouldStart(getState()[stateKey], stateRequest))
            return Promise.resolve();

        dispatch(pendingActionCreator({ actionTypes, stateRequest }));

        headers = Object.assign(
                headers,
                {
                    "Authorization": `OAuth ${token.content}`
                }
        );

        RESTcall({
            url,
            method,
            headers,
            data
        }).then((response)=> {
            const content = mapResponse({ response });

            dispatch(successActionCreator({ actionTypes, stateRequest, content, maxAge }));
        }).catch((error)=> {
            dispatch(failureActionCreator({ actionTypes, stateRequest, error }));
        });
    };
}

export default requestActionCreator;
