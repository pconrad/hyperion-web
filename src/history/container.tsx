import * as React from 'react';

import DatePicker from 'material-ui/DatePicker';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { retrieveHistoricalReadings } from '../api';
import { formatDateFull, isFutureDate } from '../dates';
import { Reading } from '../model';
import View from './view';

interface State {
    error?: Error;
    loading: boolean;
    reading?: Reading;
    selectedDate?: Date;
}

class HistoryContainer extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            loading: false,
        };
    }

    render() {
        const { error, loading, reading } = this.state;

        return (
            <div>
                <h1>Retrieve history</h1>
                <DatePicker
                    hintText='Select a date...'
                    container='inline'
                    autoOk={ true }
                    formatDate={ formatDateFull }
                    shouldDisableDate={ isFutureDate }
                    onChange={ this.selectDate }
                />
                <br />
                { loading    && <LinearProgress /> }
                { error      && <Snackbar autoHideDuration={ 2000 } message={ error.message } open={ !!error } /> }
                { reading    && <View       data={ reading } /> }
            </div>
        );
    }

    private selectDate = (event: any, selectedDate: Date) => {
        this.setState({ ...this.state, selectedDate, loading: true });
        retrieveHistoricalReadings(selectedDate)
            .then((reading) => this.setState({ ...this.state, loading: false, reading }))
            .catch((error) => this.setState({ ...this.state, loading: false, error }));
    }
}

export default HistoryContainer;
