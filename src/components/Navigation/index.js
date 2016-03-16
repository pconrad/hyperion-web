import React from 'react';
import { Link } from 'react-router';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NAV_LINKS = {
    home: { link: '/', title: 'Home' },
    current: { link: '/current', title: 'Current' },
};

class Navigation extends React.Component {
    renderNavItem(linkName) {
        const link = NAV_LINKS[linkName];
        return (
            <LinkContainer to={ { pathname: link.link } } key={ linkName }>
                <NavItem className={ this.props.activePage === linkName ? 'active' : '' } >
                    { link.title }
                </NavItem>
            </LinkContainer>
        );
    }

    render() {
        const brand = <Link to="/" className="navbar-brand">Υπερίων</Link>;
        const links = Object.keys(NAV_LINKS).map((i) => this.renderNavItem(i));

        return (
            <Navbar staticTop componentClass="header" role="banner">
                <Navbar.Header>
                    <Navbar.Brand>{ brand }</Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    { links }
                </Nav>
            </Navbar>
        );
    }
}

Navigation.propTypes = { activePage: React.PropTypes.string.isRequired };

export default Navigation;
