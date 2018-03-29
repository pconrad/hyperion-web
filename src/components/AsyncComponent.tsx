import * as React from 'react';

interface State {
    component?: React.ComponentType;
}

/**
 * A wrapper to dynamically load a component. Doing this will make Create React App emit a separate bundle.
 * Inspired by https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
 * @param {*} importFn Function that will dynamically load a component, e.g. using import().
 */
function asyncComponent<TProps>(importFn: () => Promise<any>): React.ComponentType<TProps> {
    class AsyncComponent extends React.Component<TProps, State> {
        constructor(props: TProps) {
            super(props);
            this.state = {};
        }

        async componentDidMount() {
            const result = await importFn();
            const component = result.default;
            this.setState({ component });
        }

        render() {
            const Child = this.state.component;

            return Child ? <Child { ...this.props } /> : null;
        }
    }

    return AsyncComponent;
}

export default asyncComponent;
