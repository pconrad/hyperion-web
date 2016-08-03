import React from 'react';

import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import MeterReading from 'components/MeterReading';
import historyService from 'services/HistoryService';
import moment from 'moment';

const DATE_PATTERNS = ['DD-MM-YYYY', 'YYYY-MM-DD'];

class HistoryPage extends React.Component {

    constructor() {
        super();

        this.state = {
            alertVisible: true,
            loading: false,
            searchDate: '',
        };

        this.dismissAlert = this.dismissAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    getValidationState() {
        if (this.state.searchDate.length === 0) return undefined;
        return moment(this.state.searchDate, DATE_PATTERNS).isValid() ? 'success' : 'error';
    }

    handleChange(event) {
        this.setState({
            searchDate: event.target.value,
        });
    }

    dismissAlert() {
        this.setState({ alertVisible: false });
    }

    search() {
        this.setState({
            error: undefined,
            loading: true,
            reading: undefined,
        });
        const cb = (result) => {
            this.setState({
                loading: false,
            });
            if (result.error) {
                this.setState({ error: result.error });
            } else {
                this.setState({ reading: result });
            }
        };
        const searchDate = moment(this.state.searchDate, DATE_PATTERNS);
        historyService.getMeterReadingByDate(searchDate, cb);
    }

    renderError() {
        const text = `The server replied with error code ${this.state.error.code}`;
        const additionalInfo = this.state.error.text ? `<br/> Message: ${this.state.error.text}` : '';

        return (
            <Alert bsStyle="danger" onDismiss={ this.dismissAlert }>
                <strong>An error occured</strong>
                <span>
                    &nbsp;{ text }. { additionalInfo }
                </span>
            </Alert>
        );
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup validationState={ this.getValidationState() } onChange={ this.handleChange }>
                        <Col componentClass={ ControlLabel } sm={ 2 }>Date</Col>
                        <Col sm={ 10 }>
                            <FormControl type="date" placeholder="dd-mm-YYYY" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={ 2 } sm={ 10 }>
                            <Button bsStyle="primary" onClick={ this.search }>
                                Search
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                { this.state.loading ?
                    <Alert bsStyle="info">
                        <strong>Loading data...</strong>
                        <span>&nbsp;Please wait, it should not take too long.</span>
                    </Alert> : null }
                { this.state.error && this.state.alertVisible ? this.renderError() : null }
                { this.state.reading && !this.state.loading ?
                    <span>
                        <h3>Meter Reading for { this.state.reading.recordDate }</h3>
                        <MeterReading reading = { this.state.reading } />
                    </span> : null }
            </div>
        );
    }
}

export default HistoryPage;
