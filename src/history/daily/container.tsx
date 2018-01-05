import * as React from 'react';

import DatePicker from 'material-ui/DatePicker';

import { retrieveHistoricalReadings } from '../../api';
import { formatDateFull, isFutureDate } from '../../dates';
import { Reading } from '../../model';
import Promised from '../../promised';
import View from './view';

const PromisedRecentReadingsView = Promised<Reading>('data', View);

interface State {
    promise?: Promise<Reading>;
    selectedDate?: Date;
}

class HistoryContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        const { promise } = this.state;

        return (
            <React.Fragment>
                <h1>Retrieve history by date</h1>
                <DatePicker
                    hintText='Select a date...'
                    container='inline'
                    autoOk={ true }
                    firstDayOfWeek={ 0 }
                    formatDate={ formatDateFull }
                    shouldDisableDate={ isFutureDate }
                    onChange={ this.selectDate }
                />
                <br />
                { promise && <PromisedRecentReadingsView promise={ promise } /> }
            </React.Fragment>
        );
    }

    private selectDate = (event: any, selectedDate: Date) => {
        // First remove the old promise (forcing React to re-render container)...
        this.setState({ promise: undefined }, () => {
            // ... only then to create the new promise (forcing another re-render).
            this.setState({ promise: retrieveHistoricalReadings(selectedDate) });
        });
    }
}

export default HistoryContainer;
