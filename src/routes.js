import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';


export default (
    <HashRouter>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
        </div>
    </HashRouter>
)