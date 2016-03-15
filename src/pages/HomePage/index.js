import React from 'react';

import Navigation from 'components/Navigation';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Navigation activePage="home" />
                Nice little homepage
            </div>
        );
    }
}

export default HomePage;
