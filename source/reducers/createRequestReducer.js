const getInitialState = (initialState = {})=> (
    Object.assign(
        initialState,
        {
            requests: new Map()
        }

    )
);

const getInitialRequestState = ()=> ({
    expiry: 0,
    status: "",
    keys: new Set(),
    sent: null,
    dataAccessKeys: null,
    error: null,
    errorOccuredAt: null,
    content: null
});

const getUpdatedStateClone = (stateClone, request, action)=> {
    stateClone.requests.set(action.stateRequest, request);
    return stateClone;
};

function createRequestReducer({
    actionTypes,
    initialState
}) {
    initialState = getInitialState(initialState);

    return (state = initialState, action = {})=> {
        let stateClone = Object.assign({}, state),
            request = stateClone.requests.get(action.stateRequest) || getInitialRequestState();

        switch (action.type) {
            case actionTypes.pending:
                request.status = "pending";
                request.sent = Date.now();

                return getUpdatedStateClone(stateClone, request, action);

            case actionTypes.success:
                request.status = "success";
                request.expiry = Date.now() + action.maxAge;
                request.error = null;
                request.errorOccuredAt = null;
                request.content = action.content;

                if (action.dataAccessKeys)
                    request.dataAccessKeys = action.dataAccessKeys;

                return getUpdatedStateClone(stateClone, request, action);

            case actionTypes.failure:
                request.status = "failure";
                request.error = action.error;
                request.errorOccuredAt = Date.now();

                return getUpdatedStateClone(stateClone, request, action);
        }
        return state;
    }
}

export default createRequestReducer;
