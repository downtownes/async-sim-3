import React, { Component } from 'react';
import axios from 'axios';
import  { Link } from 'react-router-dom';


export default class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <div className="lefthandIcons">
                    <h2 className="heloTitle">Helo</h2>
                    <Link to="/home"><img className="homeIcon" src="https://github.com/DevMountain/simulation-3/blob/master/assets/home.png?raw=true" /></Link>
                    <img className="searchIcon" src="https://github.com/DevMountain/simulation-3/blob/master/assets/search.png?raw=true" />
                </div>
                <h3 className="dashboardTitle">Dashboard</h3>
                <a href={'http://localhost:4000/auth/logout'}>
                    <button className="navBarLogout">Logout</button>
                </a>
            </div>
        )
    }
}