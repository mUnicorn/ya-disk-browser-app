import { Jumbotron, Alert, Button } from "react-bootstrap";
import urls from "../rest/urls.json";
const { PropTypes } = React;

const renderAuthButton = ()=> (
    <Button bsStyle="primary">
        <a style={{ color: "#fff", textDecoration: "none" }} href={urls.yandexOAuth}>Proceed to auth page</a>
    </Button>
);

const renderTitle = ()=> (
    <Jumbotron>
        <h2>Welcome to Ya disk browser app!</h2>
        <p>In order to use this app, you must pass the yandex disk authorization.</p>
        <p>{renderAuthButton()}</p>
    </Jumbotron>
);

const renderError = ()=> (
     <Alert bsStyle="warning">
         <h2>Oops!</h2>
         <p>Your yandex disk authorization expired.</p>
         <p>Please authorize again.</p>
         <p>{renderAuthButton()}</p>
     </Alert>
);

const AuthView = ({ authExpired })=> (
    <div className="AuthView">
        {authExpired
            ? renderError()
            : renderTitle()}
    </div>
);

AuthView.propTypes = {
    authExpired: PropTypes.bool
};

export default AuthView;
