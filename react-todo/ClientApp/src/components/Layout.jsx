import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { UserService } from '../services/UserService';
import { StorageService } from '../services/StorageService';

export class Layout extends Component {
    displayName = Layout.name
    
    logout = event => {
        event.preventDefault();
        StorageService.removeJWTKey();
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
                            {UserService.info() ? <button onClick={this.logout}>Logout</button> : ''}
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
