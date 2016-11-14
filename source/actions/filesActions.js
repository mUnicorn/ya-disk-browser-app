import requestActionsCreator from "./requestActionsCreator.js";
import { getDirectorySet } from "./actionTypes.js";
import urls from "../rest/urls.json";

const getDirectory = (path = "/")=> (
    requestActionsCreator({
        actionTypes: getDirectorySet,
        url: urls.resources,
        data: { "path": path },
        stateKey: "directories",
        mapResponse: ({ response: { data } })=> {
            const embedded = data._embedded,
                { items, total } = embedded;

            return { items, total };
        }
    })
);

export { getDirectory };
