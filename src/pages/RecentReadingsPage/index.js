import React from 'react';

import { Alert, Col, Grid, Row } from 'react-bootstrap';

import FormattingService from 'services/FormattingService';
import Navigation from 'components/Navigation';
import RecentReadingsService from 'services/RecentReadingsService';

import { Line as LineChart } from 'react-chartjs';

const chartOptions = {
    animation: false,
    bezierCurve: false,
    pointDot: false,
    responsive: true,
    title: {
        display: true,
        text: 'Recent meter readings',
    },
    width: '600px',
};
const formattingService = new FormattingService();
const recentReadingsService = new RecentReadingsService();

class RecentReadingsPage extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        recentReadingsService.getRecentReadings((result) => {
            if (result.error) {
                this.setState({ error: result });
            } else {
                this.setState({ history: result });
            }
        });
    }

    renderLoading() {
        return (<span>Loading data, please wait...</span>);
    }

    renderError() {
        const errorCode = this.state.error ? this.state.error.code : 'unknown';
        return (<Alert bsStyle="danger">
            <strong>An error occured</strong>
            <span>&nbsp;The server replied with error code { errorCode }.</span>
        </Alert>);
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
                <Navigation activePage="recent" />

                <Grid>
                <Row>
                    <Col lg={ 12 }>We'll show the recent meter readings here.</Col>
                </Row>
                <Row>
                    <Col lg={ 12 }>
                        { this.state.history ? this.renderRecords() : null }
                        { this.state.error ? this.renderError() : null }
                        { !this.state.history && !this.state.error ? this.renderLoading() : null }
                    </Col>
                </Row>
                </Grid>
            </div>
        );
    }
}

export default RecentReadingsPage;
