import React from 'react';
import { Link } from 'react-router';

import { Nav, Navbar } from 'react-bootstrap';

const NAV_LINKS = {
    home: { link: '/', title: 'Home' },
    current: { link: '/current', title: 'Current' },
};

class Navigation extends React.Component {
    renderNavItem(linkName) {
        const link = NAV_LINKS[linkName];
        return (
            <li className={ this.props.activePage === linkName ? 'active' : '' } key={ linkName }>
                <Link to={ link.link }>{ link.title }</Link>
            </li>
        );
    }

    render() {
        const brand = <Link to="/" className="navbar-brand">Υπερίων</Link>;
        const links = Object.keys(NAV_LINKS).map((i) => this.renderNavItem(i));

        return (
            <Navbar staticTop componentClass="header" role="banner">
                <Navbar.Header>{ brand }</Navbar.Header>
                <Navbar.Collapse className="bs-navbar-collapse">
                    <Nav role="navigation" id="top">{ links }</Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

Navigation.propTypes = { activePage: React.PropTypes.string.isRequired };

export default Navigation;
