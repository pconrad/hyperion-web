import React from 'react';

import Navigation from 'components/Navigation';

class RecentReadingsPage extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navigation activePage="recent" />
                We'll show the recent meter readings here.
            </div>
        );
    }
}

export default RecentReadingsPage;