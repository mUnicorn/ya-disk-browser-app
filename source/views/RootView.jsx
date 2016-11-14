import { Grid, Row, Col, PageHeader } from "react-bootstrap";

const RootView = ({ children })=> (
    <div className="RootView">
        <Grid>
            <Row>
                <Col xs={12} md={8} mdOffset={2}>
                    <PageHeader>Ya disk browser app.</PageHeader>
                    {children}
                </Col>
            </Row>
        </Grid>
    </div>
);

export default RootView;
