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
        const consumption = this.state.currentReading.consumption;
        const production = this.state.currentReading.production;
        return (<Grid>
            <Row>
                <Col lg={ 6 }><strong>Last updated:</strong></Col>
                <Col lg={ 6 }>{ formattingService.formatDateFull(this.state.currentReading.ts) }</Col>
            </Row>
            <Row>
                <Col lg={ 6 }><strong>Electricity consumption:</strong></Col>
                <Col lg={ 6 }>{ formattingService.formatNumberPower(consumption) }</Col>
            </Row>
            <Row>
                <Col lg={ 6 }><strong>Electricity production:</strong></Col>
                <Col lg={ 6 }>{ formattingService.formatNumberPower(production) }</Col>
            </Row>
            <Row>
                <Col lg={ 6 }><strong>Current tariff:</strong></Col>
                <Col lg={ 6 }>{ this.state.currentReading.tariff === '0001' ? 'Low' : 'Normal' }</Col>
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
