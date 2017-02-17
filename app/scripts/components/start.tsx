import * as React from "react"
import Paper from 'material-ui/Paper';

const style = {
    paddingTop: 19
}

export interface StartState {
}

export interface StartProps {
}

export const Start = (props) => (
    <Paper style={ style }>This is the Start component!</Paper>
);
