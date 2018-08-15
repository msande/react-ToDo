import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { ToDo } from './components/ToDo';
import { AlertService } from './services/AlertService';
import { NotificationService } from './services/NotificationService';
import './App.min.css';

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
                <Route exact path='/login' component={Login} />
                <Route path='/todo' component={ToDo} />
                <AlertService />
            </Layout>
        );
    }
}
