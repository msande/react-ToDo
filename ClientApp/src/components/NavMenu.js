import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>react</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Home
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/login'} exact>
                            <NavItem>
                                <Glyphicon glyph='login' /> Login
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/todo'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> ToDo
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
