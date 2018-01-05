import * as React from 'react';

import { retrieveRecentReadings } from '../api';
import { RecentReading } from '../model';
import Promised from '../promised';
import View from './view';

const PromisedRecentReadingsView = Promised<RecentReading[]>('data', View);

// tslint:disable-next-line:no-empty-interface
interface Props {
}

interface State {
    promise: Promise<RecentReading[]>;
}

class RecentContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.setState({ promise: retrieveRecentReadings() });
    }

    render() {
        const { promise } = this.state;

        return (
            <React.Fragment>
                <h1>Recent data</h1>
                <PromisedRecentReadingsView promise={ promise } />
            </React.Fragment>
        );
    }
}

export default RecentContainer;
