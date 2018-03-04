import * as React from 'react';

import TextField from 'material-ui/TextField';

interface YearSelectorProps {
    selectedYear?: number;
    updateSelectedYear: (selectedYear?: number) => void;
}

interface YearSelectorState {
    error?: string;
    value: string;
}

class YearSelector extends React.Component<YearSelectorProps, YearSelectorState> {
    constructor(props: YearSelectorProps) {
        super(props);
        const value = props.selectedYear ? props.selectedYear.toString() : '';
        this.state = { value };
    }

    componentWillReceiveProps(props: YearSelectorProps) {
        const value = props.selectedYear ? props.selectedYear.toString() : '';
        this.setState({ value });
    }

    render() {
        const { error, value } = this.state;

        return (
            <React.Fragment>
                <TextField
                    errorText={ error }
                    hintText='Year'
                    onChange={ this.onChange }
                    value={ value }
                />
            </React.Fragment>
        );
    }

    private onChange = (e: React.FormEvent<{}>, value: string) => {
        if (value.length === 0) {
            this.setState({ value });
            this.props.updateSelectedYear(undefined);
            return;
        }

        const numeric = Number(value);
        if (Number.isNaN(numeric)) {
            return;
        }

        const error = this.determineErrorText(numeric);
        this.setState({ error, value });
        if (!error) {
            this.props.updateSelectedYear(numeric);
        }
    }

    private determineErrorText = (input: number) => {
        if (input < 2010) {
            return 'Please enter a year later than 2010';
        } else {
            return undefined;
        }
    }
}

export default YearSelector;
