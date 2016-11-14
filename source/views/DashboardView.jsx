import { PageHeader, Panel, Alert } from "react-bootstrap";
import ResourceTable from "../components/ResourceTableComponent.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
const { PropTypes } = React;

class DashboardView extends React.Component {
    componentDidMount() {
        this.props.getData(this.props.browsing)
    }

    componentWillReceiveProps({ browsing }) {
        this.props.getData(browsing);
    }

    renderError() {
        return (
            <Alert bsStyle="warning">
                <h2>Oops!</h2>
                <p>An unknown error occured. Please refresh the page.</p>
            </Alert>
        );
    }

    renderContent() {
        const { browsing, resources, breadcrumbs } = this.props;

        return (
            <div>
                <Panel>Browsing: <Breadcrumbs items={breadcrumbs} /></Panel>
                {resources.length
                    ? <ResourceTable rows={resources} />
                    : <Alert bsStyle="info"><p>This folder is empty.</p></Alert>}
            </div>
        );
    };

    renderLoading() {
        return (
            <Panel>Now loading: {this.props.browsing}</Panel>
        );
    }

    render() {
        const { isLoading, error } = this.props;

        return (
            <div className="DashboardView">
                {error
                    ? this.renderError()
                    : isLoading
                        ? this.renderLoading()
                        : this.renderContent()}
            </div>
        );
    }
}

DashboardView.propTypes = {
    getData: PropTypes.func,
    error: PropTypes.object,
    browsing: PropTypes.string,
    isLoading: PropTypes.bool
};

export default DashboardView;
