import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ToDo } from './components/ToDo';
import { AlertService } from './services/AlertService';
import { NotificationService } from './services/NotificationService';

const notificationService = new NotificationService();

export default class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);
        notificationService.requestPermission();
    }

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/todo' component={ToDo} />
                <AlertService />
            </Layout>
        );
    }
}