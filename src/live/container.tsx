import * as React from 'react';

import LinearProgress from 'material-ui/LinearProgress';

import { LiveDataService } from '../api';
import { LiveReading } from '../model';
import View from './view';

// tslint:disable-next-line:no-empty-interface
interface Props {
}

interface State {
    lastReading?: LiveReading;
}

class LiveContainer extends React.Component<Props, State> {
    private liveDataService = new LiveDataService();

    constructor(props: Props) {
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
            <div>
                <h1>Live data</h1>
                { loading && <LinearProgress /> }
                { lastReading && <View data={ lastReading } /> }
            </div>
        );
    }
}

export default LiveContainer;
