import React, { Component } from 'react';
import decode from 'jwt-decode'

export class User extends React.Component {

    //test = '123123';
    //static token = sessionStorage.getItem('JWT');
    static info() {
        let token = sessionStorage.getItem('JWT');
        if (token) {
            return decode(token);
        } else {
            return null;
        }
    }

    static isInRole(role) {
        debugger;
        let roles = this.info().roles;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === role) {
                return true;
            }
        }
        return false;
    }

    /*constructor(props) {
        super(props);
        debugger;
        let token = sessionStorage.getItem('JWT');
        //debugger;
        if (token) {
            //let o = decode(token);
            let user = decode(token);
            if (user.roles['Administrator']) {
                debugger;
            }
            debugger;
        }

    }*/
}