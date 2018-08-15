import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import decode from 'jwt-decode'

export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);

        this.state = {
            email: "user1",
            password: "4i9S97Dx2@LQM9KCwTabrm"
        };

        let token = sessionStorage.getItem('JWT');
        //debugger;
        if (token) {
            //let o = decode(token);
            let user = decode(token);
            debugger;
        }
        
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        await fetch('api/User/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => response.json())
            .then((response) => {
                //debugger;
                //let r = response.json();
                //debugger;
                sessionStorage.setItem('JWT', response.token);
                //let r2 = r.content;
                //debugger;
                if (response.status === 200) {
                    //alertService.save('Saved');
                    //this.setState({ todoItems: this.state.todoItems });
                } else {
                    //alertService.error('Sorry, an error occurred.');
                }
            });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="input"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
          </Button>
                </form>
            </div>
        );
    }
}