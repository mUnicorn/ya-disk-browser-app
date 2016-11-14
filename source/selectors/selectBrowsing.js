import { createSelector } from "reselect";

const selectBrowsing = createSelector(
    (_, { router })=> (router.location.query.browsing),
    (browsing = "/")=> (browsing)
);

export default selectBrowsing;
