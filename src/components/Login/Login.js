import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';


class Login extends Component{
    constructor(){
        super();
    }

    
    render(){
        return(
            <div className="login">
                <div className="loginButtonContainer">
                    <img className="loginLogo"src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/logo.png"/>
                    <h1 className="loginHeader">Helo</h1>
                    <a href={process.env.REACT_APP_LOGIN}>
                    <button className="loginButton">Login / Register</button>
                    </a>
                </div>
            </div>
        )
    }
}


export default (Login)