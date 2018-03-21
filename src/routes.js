import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';


export default (
    <HashRouter>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile}/>
            <Route path="/search" component={Search}/>
        </div>
    </HashRouter>
)