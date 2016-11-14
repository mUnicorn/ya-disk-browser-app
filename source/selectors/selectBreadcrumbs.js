import { createSelector } from "reselect";

const selectBreadcrumbs = createSelector(
    [
        (_, { router })=> (router),
        (_, { router })=> (router.location.query.browsing),
    ],
    (router, browsing = "/")=> {
        let currentPath = "";

        return browsing.split("/").map((pathName, index, array)=> {
            const active = index === array.length - 1;

            currentPath += active ? pathName : `${pathName}/`;

            const copyPath = currentPath,
                onClick = ()=> {
                    router.push({ query: { browsing: copyPath } });
                };

            return {
                text: (!index) ? "root" : pathName,
                active,
                onClick
            };
        });
    }
);

export default selectBreadcrumbs;
