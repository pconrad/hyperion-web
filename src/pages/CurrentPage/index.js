import React from 'react';

import Navigation from 'components/Navigation';

class CurrentPage extends React.Component {
    render() {
        return (
            <div>
                <Navigation activePage="current" />
                Nice page with current readings
            </div>
        );
    }
}

export default CurrentPage;
