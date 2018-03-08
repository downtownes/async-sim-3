import React, { Component } from 'react';


export default class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <div className="lefthandIcons">
                    <h2 className="heloTitle">Helo</h2>
                    <img className="homeIcon" src="https://github.com/DevMountain/simulation-3/blob/master/assets/home.png?raw=true" />
                    <img className="searchIcon" src="https://github.com/DevMountain/simulation-3/blob/master/assets/search.png?raw=true" />
                </div>
                <h3 className="dashboardTitle">Dashboard</h3>
                <a href="http://localhost:3000/api/auth/logout">
                    <button className="navBarLogout">Logout</button>
                </a>
            </div>
        )
    }
}