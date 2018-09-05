import * as React from 'react';

import { Progress } from 'reactstrap';

import { LiveDataService } from '../api';
import { LiveReading } from '../model';
import View from './view';

interface State {
    lastReading?: LiveReading;
}

class LiveContainer extends React.Component<{}, State> {
    private liveDataService = new LiveDataService();

    constructor(props: {}) {
        super(props);
        this.state = { };
    }

    componentWillMount() {
        this.liveDataService.connect((data) => this.setState({ lastReading: data }));
    }

    componentWillUnmount() {
        this.liveDataService.disconnect();
    }

    render() {
        const { lastReading } = this.state;
        const loading = !lastReading;

        return (
            <React.Fragment>
                <h1>Live data</h1>
                { loading && this.loading() }
                { lastReading && <View data={ lastReading } /> }
            </React.Fragment>
        );
    }

    private loading = () => (
        <React.Fragment>
            <div />
            <div className='text-center'>Loading, please wait...</div>
            <Progress animated={ true } max={ 100 } striped={ true } value={ 100 } />
        </React.Fragment>
    )
}

export default LiveContainer;
