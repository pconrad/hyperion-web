import React from 'react';
import { Link } from 'react-router';

import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MENU_ITEMS = [
    { link: '/home', title: 'Home' },
    { link: '/current', title: 'Current' },
    { link: '/recent', title: 'Recent' },
    { link: '/history', title: 'History' },
    { link: '/info', title: 'Info' },
];

const Navigation = function () {
    return (
        <div className="header">
            <Nav bsStyle="pills" pullRight="true">
                { MENU_ITEMS.map((item) => (
                    <LinkContainer to={ { pathname: item.link } } key={ item.title } >
                        <NavItem>
                            { item.title }
                        </NavItem>
                    </LinkContainer>)) }
            </Nav>

            <h3 className="text-muted">Υπερίων</h3>
        </div>
    );
};

Navigation.propTypes = {
//    activePage: React.PropTypes.string.isRequired,
};

export default Navigation;
