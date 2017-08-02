import * as React from 'react';

import LinearProgress from 'material-ui/LinearProgress';

import { LiveDataService } from '../api';
import { LiveReading } from '../model';
import { View } from './view';

interface Props {
}

class LiveContainer extends React.Component<Props, { lastReading?: LiveReading }> {
    private liveDataService = new LiveDataService();

    constructor() {
        super();
        this.state = { };
    }

    public componentWillMount() {
        this.liveDataService.connect((data) => this.setState({ lastReading: data }));
    }

    public componentWillUnmount() {
        this.liveDataService.disconnect();
    }

    public render() {
        const { lastReading } = this.state;
        const loading = !lastReading;

        return (
            <div>
                <h1>Live data</h1>
                { loading && <LinearProgress /> }
                { lastReading && <View data={ lastReading } /> }
            </div>
        );
    }
}

export default LiveContainer;
