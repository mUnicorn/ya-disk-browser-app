import { createSelector } from "reselect";
import selectBrowsing from "./selectBrowsing.js";

const currentDirectory = createSelector(
    [
        ({ directories })=> (directories),
        selectBrowsing
    ],
    (directories, browsing)=> {
        for (let [requestBody, requestState] of directories.requests) {
            if (requestBody.path === browsing)
                return requestState;
        }

        return {};
    }
);

export default currentDirectory;
