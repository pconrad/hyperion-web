import React from 'react';

import { Alert, Col, Grid, Row } from 'react-bootstrap';

import Navigation from 'components/Navigation';
import currentReadingsService from 'services/CurrentReadingsService';
import formattingService from 'services/FormattingService';

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
        const consumption = this.state.currentReading.elecCon;
        const production = this.state.currentReading.elecProd;
        const gas = this.state.currentReading.gas;
        const tariff = this.state.currentReading.tariff === '0001' ? 'Low' : 'Normal';
        const makeRow = (label, value) => (
            <Row>
              <Col lg={ 6 }><strong>{ label }</strong></Col>
              <Col lg={ 6 }>{ value }</Col>
            </Row>
        );
        return (<Grid>
          { makeRow('Last updated',
                     formattingService.formatDateFull(this.state.currentReading.ts)) }
          { makeRow('Electricity consumption',
                     formattingService.formatNumberPower(consumption)) }
          { makeRow('Electricity production',
                     formattingService.formatNumberPower(production)) }
          { gas ? makeRow('Gas meter',
                          formattingService.formatNumberGas(gas)) : null }
          { makeRow('Current tariff', tariff) }
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
