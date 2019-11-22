import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import './css/style.css';

import Home from './Home';
import Subscribe from './Subscribe';
import {Login} from './Login';
import Project from './Project';

class App extends React.Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/subscribe' component={Subscribe}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/project/:id' component={Project}/>
                    <Route path='/explore' component={Explore}/>
                    <Route path='/explore/:id' component={Explore}/>
                </Switch>
            </div>
        )
    }
}

export default App;