import { createSelector } from "reselect";
import selectCurrentDirectory from "./selectCurrentDirectory.js";

const selectItems = createSelector(
    [
        selectCurrentDirectory,
        (_, { router })=> (router),
        ({ directories })=> (directories)
    ],
    ({ content, error }, router)=> {
        if (error || !content || !Array.isArray(content.items))
            return [];

        return content.items.map(({ name, type, media_type, path }, index)=> {
            const isFolder = (type === "dir");
            let onClick = null;

            if (isFolder) {
                type = "folder";
                onClick = ()=> {
                    router.push({ query: { browsing: path } });
                };
            }
            else
                type = media_type;

            return {
                name,
                isFolder,
                onClick,
                type
            };
        });
    }
);

export default selectItems;
