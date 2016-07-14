import React from 'react';

import Navigation from 'components/Navigation';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Navigation activePage={ this.props.location.pathname } />
                { this.props.children }
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object.isRequired,
};

export default App;
