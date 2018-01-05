import * as React from 'react';

import { retrieveApplicationInfo } from '../api';
import { ApplicationInfo } from '../model';
import Promised from '../promised';
import View from './view';

const PromisedAboutView = Promised<ApplicationInfo>('data', View);

// tslint:disable-next-line:no-empty-interface
interface Props {
}

interface State {
    promise: Promise<ApplicationInfo>;
}

export class AboutContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.setState({ promise: retrieveApplicationInfo() });
    }

    render() {
        const { promise } = this.state;
        return (
            <React.Fragment>
                <h1>About Υπερίων</h1>
                <PromisedAboutView promise={ promise } />
            </React.Fragment>
        );
    }
}

export default AboutContainer;
