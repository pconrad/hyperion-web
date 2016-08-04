import React from 'react';

import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import MeterReadings from 'components/MeterReading';
import apiService from 'services/ApiService';
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

    search(event) {
        event.preventDefault();
        this.setState({
            error: undefined,
            loading: true,
            readings: undefined,
        });
        const cb = (result) => {
            if (result.error) {
                this.setState({
                    error: result.error,
                    loading: false,
                });
            } else {
                this.setState({
                    date: moment(result.recordDate).format('dddd, MMMM Do YYYY'),
                    loading: false,
                    readings: [result],
                });
            }
        };
        const searchDate = moment(this.state.searchDate, DATE_PATTERNS);
        apiService.getMeterReadingByDate(searchDate, cb);
    }

    renderError() {
        const text = `The server replied with error code ${this.state.error.code}`;
        const additionalInfo = this.state.error.text ? `Message: ${this.state.error.text}` : '';

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
                <Form horizontal onSubmit = { this.search }>
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
                { this.state.readings && !this.state.loading ?
                    <span>
                        <h3>Meter Reading for { this.state.date }</h3>
                        <MeterReadings readings={ this.state.readings } />
                    </span> : null }
            </div>
        );
    }
}

export default HistoryPage;
