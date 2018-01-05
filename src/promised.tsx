import * as React from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

interface PromisedState {
    error?: Error;
    loading: boolean;
    value?: any;
}

// tslint:disable-next-line:only-arrow-functions
const Promised = function<T, ChildProps = {}>(propName: string, Wrapped: React.ComponentType<ChildProps>) {
    interface WrapperProp {
        promise: Promise<T>;
    }
    type PromisedProps = ChildProps & WrapperProp;

    return class PromisedWrapper extends React.Component<PromisedProps, PromisedState> {
        constructor(props: PromisedProps) {
            super(props);
            this.state = { loading: true };
        }

        componentWillMount() {
            this.props.promise
                .then(this.handleSuccess)
                .catch(this.handleRejection);
        }

        render() {
            const { error, loading, value } = this.state;
            if (error) {
                return <Snackbar message={ error.message } open={ !!error } />;
            } else if (loading) {
                return <LinearProgress />;
            } else {
                const childProps = { [propName]: value };
                return <Wrapped { ...childProps } />;
            }
        }

        private handleRejection = (error: Error) => {
            this.setState({ error, loading: false });
        }

        private handleSuccess = (value: T) => {
            this.setState({ loading: false, value });
        }
    };
};

export default Promised;
