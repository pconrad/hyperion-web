import React from 'react';

import Navigation from 'components/Navigation';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Navigation activePage="home" />
                Welcome to Hyperion.
            </div>
        );
    }
}

export default HomePage;
