import React from 'react';

import Navigation from 'components/Navigation';

const App = function (props) {
    return (
        <div className="container">
            <Navigation activePage={ props.location.pathname } />
            { props.children }
        </div>
    );
};

App.propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object.isRequired,
};

export default App;
