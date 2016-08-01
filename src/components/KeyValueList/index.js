import React from 'react';

import { Col, Grid, Row } from 'react-bootstrap';

const KeyValueList = function (props) {
    return (
        <Grid>
        { props.rows.map((row) => (
            <Row key = { row.label }>
                <Col lg={ 6 }><strong>{ row.label }</strong></Col>
                <Col lg={ 6 }>{ row.value }</Col>
            </Row>
        )) }
        </Grid>
    );
};

KeyValueList.propTypes = {
    rows: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.string,
    })).isRequired,
};

export default KeyValueList;
