import React from 'react';
import { Link } from 'react-router';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MENU_ITEMS = [
    { link: '/home', title: 'Home' },
    { link: '/current', title: 'Current' },
    { link: '/recent', title: 'Recent' },
    { link: '/history', title: 'History' },
    { link: '/info', title: 'Info' },
];

const Navigation = function (props) {
    return (
        <Navbar staticTop componentClass="header" role="banner">
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/" className="navbar-brand">Υπερίων</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                { MENU_ITEMS.map((item) => (
                    <LinkContainer to={ { pathname: item.link } } key={ item.title } >
                        <NavItem className={ props.activePage === item.link ? 'active' : '' } >
                            { item.title }
                        </NavItem>
                    </LinkContainer>)) }
            </Nav>
        </Navbar>
    );
};

Navigation.propTypes = {
    activePage: React.PropTypes.string.isRequired,
};

export default Navigation;
