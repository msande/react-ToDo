import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Link, Redirect } from 'react-router-dom';
import { User } from '../services/UserService';

export class Layout extends Component {
    displayName = Layout.name
    
    logout = event => {
        event.preventDefault();
        sessionStorage.removeItem('JWT');
        window.location.href = '/login';
    }

    render() {

        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col sm={3}>
                            <NavMenu />
                        </Col>
                        <Col sm={9}>
                            {User.info() ? <a href="#" onClick={this.logout}>Logout</a> : ''}
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
