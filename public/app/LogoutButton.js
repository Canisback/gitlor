import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';
import ConstantsList from './Constants';

import Auth from './Auth';

class LogoutButton extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            logoutSuccess:false
        };
        
        this.sendLogout = this.sendLogout.bind(this);
    }
    
    
    sendLogout(event){
        event.preventDefault();
        this.setState({
            logoutSuccess:false
        })
        
        axios.get(ConstantsList.SERVER_URL + "api/logout")
          .then(res => {
            if(res.data == 1){
                this.setState({logoutSuccess:true})
                var that = this
                setTimeout(function(){
                    Auth.update()
                }, 1000);
            }
          })
    }
    
    render(){
        let logoutSuccess = this.state.logoutSuccess
        return (
            <div>
                <button variant="raised" onClick={this.sendLogout}>
                    Logout
                </button>
                {logoutSuccess && <div>Logout successful</div>}
            </div>
        )
    }
}


export default LogoutButton;