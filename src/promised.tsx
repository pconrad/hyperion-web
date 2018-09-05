import * as React from 'react';

import {
    Alert,
    Progress,
} from 'reactstrap';

interface PromisedState {
    error?: Error;
    loading: boolean;
    value?: any;
}

// Inspired by http://natpryce.com/articles/000814.html

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
                return <Alert color='danger'>{ error.message }</Alert>;
            } else if (loading) {
                return (
                    <React.Fragment>
                        <div />
                        <div className='text-center'>Loading, please wait...</div>
                        <Progress animated={ true } max={ 100 } striped={ true } value={ 100 } />
                    </React.Fragment>
                );
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
