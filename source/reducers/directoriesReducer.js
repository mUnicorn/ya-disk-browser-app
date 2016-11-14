import { getDirectorySet } from "../actions/actionTypes.js";
import createRequestReducer from "./createRequestReducer.js";

const directories = createRequestReducer({
    actionTypes: getDirectorySet
});

export { directories };
