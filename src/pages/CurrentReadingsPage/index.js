import React from 'react';

import { Alert, Col, Grid, Row } from 'react-bootstrap';

import Navigation from 'components/Navigation';
import CurrentReadingsService from 'services/CurrentReadingsService';
import FormattingService from 'services/FormattingService';

const currentReadingsService = new CurrentReadingsService();
const formattingService = new FormattingService();

class CurrentReadingsPage extends React.Component {
    constructor() {
        super();
        this.state = {};

    }

    componentDidMount() {
        currentReadingsService.connect((data) => {
            this.setState({
                currentReading: data,
            });
        });
    }

    componentWillUnmount() {
        currentReadingsService.disconnect();
    }

    renderLastUpdated() {
        return (<Grid>
            <Row>
                <Col><strong>Last updated:</strong></Col>
                <Col>{ formattingService.formatDateFull(this.state.currentReading.ts) }</Col>
            </Row>
            <Row>
                <Col><strong>Current consumption:</strong></Col>
                <Col>{ formattingService.formatNumberPower(this.state.currentReading.consumption) }</Col>
            </Row>
            <Row>
                <Col><strong>Current production:</strong></Col>
                <Col>{ formattingService.formatNumberPower(this.state.currentReading.production) }</Col>
            </Row>
            <Row>
                <Col><strong>Current tariff:</strong></Col>
                <Col>{ "0001" === this.state.currentReading.tariff ? "Low" : "Normal" }</Col>
            </Row>
        </Grid>);
    }

    render() {
        const noDataWarning = (<Alert bsStyle="warning">
            <strong>No data received yet</strong>
            <span>&nbsp;Please wait, it should not take more than 10 seconds.</span>
        </Alert>);

        return (
            <div>
                <Navigation activePage="current" />

                { this.state.currentReading ? this.renderLastUpdated() : noDataWarning }
            </div>
        );
    }
}

export default CurrentReadingsPage;
