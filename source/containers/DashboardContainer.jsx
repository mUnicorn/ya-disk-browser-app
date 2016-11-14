import { connect } from "react-redux";
import View from "../views/DashboardView.jsx";
import { getDirectory } from "../actions/filesActions.js";
import selectBrowsing from "../selectors/selectBrowsing.js";
import selectCurrentDirectory from "../selectors/selectCurrentDirectory.js";
import selectCurrentDirectoryItems from "../selectors/selectCurrentDirectoryItems.js";
import selectBreadcrumbs from "../selectors/selectBreadcrumbs.js";

export default connect(
    (state, ownProps)=> {
        const request = selectCurrentDirectory(state, ownProps),
            { error, status } = request,
            isLoading = status === "pending",
            router = ownProps.router,
            browsing = selectBrowsing(state, ownProps),
            resources = selectCurrentDirectoryItems(state, ownProps),
            breadcrumbs = selectBreadcrumbs(state, ownProps);

        return {
            resources,
            error,
            isLoading,
            browsing,
            breadcrumbs
        };
    },
    { getData: getDirectory }
)(View);
