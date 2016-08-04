import React from 'react';

import { Alert, Col, Grid, Row } from 'react-bootstrap';

import apiService from 'services/ApiService';
import formattingService from 'services/FormattingService';

import { Line as LineChart } from 'react-chartjs';

const chartOptions = {
    animation: false,
    bezierCurve: false,
    pointDot: false,
    responsive: true,
};

class RecentReadingsPage extends React.Component {
    constructor() {
        super();
        this.state = { alertVisible: true };
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    componentDidMount() {
        apiService.getRecentReadings((result) => {
            if (result.error) {
                this.setState({ error: result });
            } else {
                this.setState({ history: result });
            }
        });
    }

    dismissAlert() {
        this.setState({ alertVisible: false });
    }

    shouldShowLoading() {
        return !this.state.history && !this.state.error;
    }

    renderLoading() {
        return (<span>Loading data, please wait...</span>);
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

    renderRecords() {
        const data = {
            labels: this.state.history.map((e) => formattingService.formatDateOnlyTime(e.ts)),
            datasets: [
                { label: 'Electricity consumed',
                  data: this.state.history.map((e) => e.elecCon * 1000) },
            ],
        };

        return (<Grid>
            <Row>
                <Col lg={ 12 }>
                    <LineChart data={ data } options={ chartOptions } />
                </Col>
            </Row>
        </Grid>);
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col lg={ 12 }>
                            { this.state.history ? this.renderRecords() : null }
                            { this.state.error && this.state.alertVisible ? this.renderError() : null }
                            { this.shouldShowLoading() ? this.renderLoading() : null }
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RecentReadingsPage;
