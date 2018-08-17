import React, { Component } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export class AlertService extends React.Component {

    static options = {
        position: 'bottom-right',
        effect: 'jelly',
        timeout: 1000
    }

    static save(message) {
        Alert.success(message, this.options);
    }

    static error(message) {
        Alert.error(message, this.options);
    }

    render() {
        return(
            <Alert stack={{ limit: 2 }} />
        )
    }
}