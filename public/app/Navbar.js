import React from 'react';
import {Form} from './Login';
import LogoutButton from './LogoutButton';
import Auth from './Auth';
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            loggedIn:false
        };
        Auth.attach(this)
        this.notify = this.notify.bind(this)
        Auth.update(function(){console.log(Auth)})
    }
    
    notify(){
        this.setState({"username":Auth.username,"loggedIn":Auth.loggedIn})
    }
    
    render(){
        let loggedIn = this.state.loggedIn
        return (
            <div id="nav-bar">
              <a className="nav-button active" href="/">
                Home
              </a>
                <Link to={'/explore'} className="nav-button">
                  Explore
                </Link>
              <div id="nav-bar-right-pane">
                {!loggedIn && 
                (<div className="dropdown align-right">
                    <label><span className="material-icons">account_circle</span> Login</label>
                    <div className="dropdown-content">
                        <Form />
                    </div>
                </div>)
                }
                    
                {loggedIn && 
                (<div className="dropdown align-right">
                    <label><span className="material-icons">account_circle</span> Account</label>
                    <div className="dropdown-content">
                        <LogoutButton />
                    </div>
                </div>)
                }
              </div>
            </div>
            )
    }
}
export default Navbar;