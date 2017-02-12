import * as React from "react"
import Paper from 'material-ui/Paper';

export interface StartState {
}

export interface StartProps {
}

export class Start extends React.Component<StartProps, StartState> {
    constructor(props: StartProps) {
        super(props);
    }

    render() {
        return (
            <Paper>This is the Start component!</Paper>
        );
    }
};