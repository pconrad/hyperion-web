import * as React from 'react';

import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import DatePicker from 'material-ui/DatePicker';

import { retrieveHistoricalReadings } from '../api'
import { formatDateFull, isFutureDate } from '../dates';
import { Reading } from '../model';
import View from './view';

interface Props {
}

interface State {
    error?: Error,
    loading: boolean,
    reading?: Reading,
    selectedDate?: Date
}

class HistoryContainer extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            loading: false
        };
    }

    componentWillMount() {
    }

    selectDate(selectedDate: Date) {
        this.setState({ ...this.state, selectedDate, loading: true });
        retrieveHistoricalReadings(selectedDate)
            .then(reading => this.setState({ ...this.state, loading: false, reading }))
            .catch(error => this.setState({ ...this.state, loading: false, error }));
    }

    render() {
        const { error, loading, reading } = this.state;

        return (<div>
            <h1>Retrieve history</h1>
            <DatePicker hintText="Select a date..."
                        container="inline"
                        autoOk={ true }
                        formatDate={ formatDateFull }
                        shouldDisableDate={ (date) => isFutureDate(date) }
                        onChange={ (evt, date) => this.selectDate(date) } />
            <br />
            { loading    && <LinearProgress /> }
            { error      && <Snackbar   autoHideDuration={ 2000 }
                                        message={ error.message }
                                        open={ !!error } /> }
            { reading    && <View       data={ reading } /> }
        </div>);
    }
}

export default HistoryContainer;