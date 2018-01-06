import * as React from 'react';

import Divider from 'material-ui/Divider';

import { retrieveHistoricalReadingsForMonth as retrieveHistoricalReadings } from '../../api';
import { Reading } from '../../model';
import Promised from '../../promised';
import MonthSelector from './monthSelector';
import View from './view';
import YearSelector from './yearSelector';

const PromisedMonthlyReadingView = Promised<Reading[]>('data', View);

interface State {
    promise?: Promise<Reading[]>;
    selectedMonth?: number;
    selectedYear?: number;
}

class MonthlyHistoryContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        const { promise, selectedMonth, selectedYear } = this.state;

        return (
            <React.Fragment>
                <h1>Retrieve history by month</h1>
                <MonthSelector selectedMonth={ selectedMonth } updateSelectedMonth={ this.updateSelectedMonth } />
                <br />
                <YearSelector selectedYear={ selectedYear } updateSelectedYear={ this.updateSelectedYear } />
                <br />
                <Divider />
                <br />
                { promise && <PromisedMonthlyReadingView promise={ promise } /> }
            </React.Fragment>
        );
    }

    private retrieveDateIfNecessary = () => {
        const month = this.state.selectedMonth;
        const year = this.state.selectedYear;

        if (!month || !year) {
            return;
        }

        // First remove the old promise (forcing React to re-render container)...
        this.setState({ promise: undefined }, () => {
            // ... only then to create the new promise (forcing another re-render).
            this.setState({ promise: retrieveHistoricalReadings(month, year) });
        });
    }

    private updateSelectedYear = (selectedYear: number) => {
        this.setState({ selectedYear }, this.retrieveDateIfNecessary);
    }

    private updateSelectedMonth = (selectedMonth: number) => {
        this.setState({ selectedMonth }, this.retrieveDateIfNecessary);
    }
}

export default MonthlyHistoryContainer;
