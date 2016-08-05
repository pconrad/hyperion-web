import React from 'react';

import { Col, Grid, Row } from 'react-bootstrap';

import Navigation from 'components/Navigation';

import './style.css';

const App = function (props) {
  // activePage={ props.location.pathname }
    return (
        <div className="container">
            <Navigation />
            <Grid>
                <Row>
                    <Col>{ props.children }</Col>
                </Row>
            </Grid>
        </div>
    );
};

App.propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object.isRequired,
};

export default App;
