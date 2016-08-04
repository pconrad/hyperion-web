import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import apiService from 'services/ApiService';
import KeyValueList from 'components/KeyValueList';

const FrontendInfoPanel = function () {
    const rows = [
        { label: 'Application version',
          value: process.env.VERSION },
    ];
    return (
        <KeyValueList rows = { rows } />
    );
};

const BackendInfoPanel = function (props) {
    const rows = [
        { label: 'Application version',
          value: props.info.appVersion },
        { label: 'Java runtime',
          value: props.info.javaVersion },
        { label: 'Scala version',
          value: props.info.scalaVersion },
        { label: 'Operating system',
          value: props.info.os },
        { label: 'Database',
          value: props.info.database },
        { label: 'Free memory',
          value: props.info.freeMem },
        { label: 'Total memory',
          value: props.info.totalMem },
    ];
    return (
        <KeyValueList rows = { rows } />
    );
};

BackendInfoPanel.propTypes = {
    info: React.PropTypes.shape({
        appVersion: React.PropTypes.string.isRequired,
        database: React.PropTypes.string.isRequired,
        freeMem: React.PropTypes.string.isRequired,
        javaVersion: React.PropTypes.string.isRequired,
        os: React.PropTypes.string.isRequired,
        scalaVersion: React.PropTypes.string.isRequired,
        totalMem: React.PropTypes.string.isRequired,
    }).isRequired,
};

class InfoPage extends React.Component {
    constructor() {
        super();
        this.state = { };
    }

    componentDidMount() {
        apiService.getAppInfo((result) => {
            if (result.error) {
                this.setState({ error: result.error });
            } else {
                this.setState({ info: result });
            }
        });
    }

    render() {
        return (
            <Tabs defaultActiveKey={ 1 } id="info-tabs">
                <Tab eventKey={ 1 } title="Front-end">
                    <span>&nbsp;</span>
                    <FrontendInfoPanel />
                </Tab>
                <Tab eventKey={ 2 } title="Back-end">
                    <span>&nbsp;</span>
                    { this.state.info ? <BackendInfoPanel info={ this.state.info } /> : 'jo' }
                </Tab>
            </Tabs>
        );
    }
}

InfoPage.propTypes = {
};

export default InfoPage;
