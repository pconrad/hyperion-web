import * as React from 'react';

import { LinearProgress, Snackbar} from 'material-ui';

import { retrieveRecentReadings } from '../api';
import { RecentReading } from '../model';
import View from './view';

interface State {
    error?: Error;
    loading: boolean;
    readings?: RecentReading[];
    selectedDate?: Date;
}

class RecentContainer extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = { loading: false };
    }

    public componentWillMount() {
        this.setState({ ...this.state, loading: true });
        retrieveRecentReadings()
            .then((readings) => this.setState({ ...this.state, loading: false, readings }))
            .catch((error) => this.setState({ ...this.state, loading: false, error }));
    }

    public render() {
        const { error, loading, readings } = this.state;

        return (
            <div>
                <h1>Recent data</h1>
                { error && <Snackbar autoHideDuration={ 2000 }  message={ error.message } open={ !!error } /> }
                { loading && <LinearProgress /> }
                { readings && <View data={ readings } />}
            </div>
        );
    }
};

export default RecentContainer;
