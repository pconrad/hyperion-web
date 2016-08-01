import React from 'react';

import { Alert } from 'react-bootstrap';

import KeyValueList from 'components/KeyValueList';
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

        const rows = [
            { label: 'Last updated',
              value: formattingService.formatDateFull(this.state.currentReading.ts) },
            { label: 'Current tariff',
              value: tariff },
            { label: 'Electricity consumption',
              value: formattingService.formatNumberPower(consumption) },
            { label: 'Electricity production',
              value: formattingService.formatNumberPower(production) },
        ];
        if (gas) {
            rows.push(
                { label: 'Gas meter',
                  value: formattingService.formatNumberGas(gas) }
            );
        }

        return (<KeyValueList rows = { rows } />);
    }

    render() {
        const noDataWarning = (<Alert bsStyle="warning">
            <strong>No data received yet</strong>
            <span>&nbsp;Please wait, it should not take more than 10 seconds.</span>
        </Alert>);

        return (
            <div>
                { this.state.currentReading ? this.renderLastUpdated() : noDataWarning }
            </div>
        );
    }
}

export default CurrentReadingsPage;
