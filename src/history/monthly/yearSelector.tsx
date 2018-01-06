import * as React from 'react';

import TextField from 'material-ui/TextField';

interface YearSelectorProps {
    selectedYear?: number;
    updateSelectedYear: (selectedYear?: number) => void;
}

class YearSelector extends React.Component<YearSelectorProps, {}> {
    constructor(props: YearSelectorProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { selectedYear } = this.props;

        return (
            <React.Fragment>
                <TextField
                    hintText='Year'
                    onChange={ this.callback }
                    value={ selectedYear }
                />
            </React.Fragment>
        );
    }

    private callback = (e: React.FormEvent<{}>, newValue: string) => {
        const numeric = Number(newValue);
        if (newValue.length === 0) {
            this.props.updateSelectedYear(undefined);
        } else if (!Number.isNaN(numeric)) {
            this.props.updateSelectedYear(numeric);
        }
    }
}

export default YearSelector;
