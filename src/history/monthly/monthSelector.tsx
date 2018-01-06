import * as React from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

interface MonthSelectorProps {
    selectedMonth?: number;
    updateSelectedMonth: (selectedMonth: number) => void;
}

class MonthSelector extends React.Component<MonthSelectorProps, {}> {
    constructor(props: MonthSelectorProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { selectedMonth } = this.props;

        return (
            <React.Fragment>
                <SelectField
                    floatingLabelText='Month'
                    onChange={ this.callback }
                    value={ selectedMonth }
                >
                    { months.map(this.createMonth) }
                </SelectField>

            </React.Fragment>
        );
    }

    private createMonth = (month: string, idx: number) => {
        const selected = this.props.selectedMonth === idx + 1;
        return (
            <MenuItem key={ idx } primaryText={ month } checked={ selected } value={ idx + 1 } />
        );
    }

    private callback = (e: React.SyntheticEvent<{}>, index: number, menuItemValue: any) => {
        this.props.updateSelectedMonth(menuItemValue);
    }
}

export default MonthSelector;
