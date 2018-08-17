import React, { Component } from "react";
import { AlertService } from '../services/AlertService';
import { HttpService } from '../services/HttpService';
import { UserForm } from "./UserForm";

export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);
    }

    handleSubmit = async (event, state) => {
        event.preventDefault();
        
        return HttpService.post(`/api/User/Login`, state)
            .then((response) => {
                if (!response.is_error && response.content.token) {
                    sessionStorage.setItem('JWT', response.content.token);
                    window.location.href = '/about';
                } else {
                    AlertService.error('Username or password is incorrect.');
                }
                return response;
            });
    }

    render() {
        return (
            <UserForm type="Login" handleSubmit={this.handleSubmit} />
        );
    }
}