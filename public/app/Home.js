import React from 'react';
import { Link } from 'react-router-dom';

import Auth from './Auth';
import LogoutButton from './LogoutButton';
import Navbar from './Navbar';

class Home extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {"username":"","loggedIn":false}
        let that = this
        Auth.attach(this)
        Auth.update(function(){})
        
    }
    
    notify(){
        this.setState({"username":Auth.username,"loggedIn":Auth.loggedIn})
    }
    
    render(){
        let loggedIn = this.state.loggedIn
        let username = this.state.username
        return (
        <div>
            <Navbar />
            Gitlor Home
            {loggedIn && <div>Hello {username}</div>}
            {!loggedIn &&
            (<div><Link to={'./subscribe'}>
                <button variant="raised">
                    Subscribe
                </button>
            </Link>
            <Link to={'./login'}>
                <button variant="raised">
                    Login
                </button>
            </Link></div>)
            }
            {loggedIn && <LogoutButton/>}
        </div>
        )
    }
}

export default Home;