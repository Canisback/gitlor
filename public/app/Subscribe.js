import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';
import ConstantsList from './Constants';
import Navbar from './Navbar';

import Auth from './Auth';

class Subscribe extends React.Component{
    render(){
        return (
        <div>
            <Navbar/>
            Gitlor Subscribe
            <div style={{"maxWidth":"300px"}}>
                <Form />
            </div>
        </div>
        )
    }
}

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            passwordMismatch:false,
            usernameTaken:false,
            subscribeSuccess:false,
            error:false,
            redirectToLogin:false
        };

        this.sendSubscription = this.sendSubscription.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }
    
    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }
    
    handleEmailChange(event){
        this.setState({email: event.target.value});
    }
    
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }
    
    handleConfirmPasswordChange(event){
        this.setState({confirmpassword: event.target.value});
    }
    
    
    sendSubscription(event){
        event.preventDefault();
        this.setState({
            subscribeSuccess:false,
            error:false,
            usernameTaken:false,
            passwordMismatch:false
        })
        
        if(this.state.password != this.state.confirmpassword){
            this.setState({passwordMismatch:true})
            return
        }
        
        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };
        
        axios.post(ConstantsList.SERVER_URL + "api/subscribe", data)
          .then(res => {
            if(res.data == 1){
                this.setState({subscribeSuccess:true})
                var that = this
                setTimeout(function(){
                    that.setState({"redirectToLogin":true})
                }, 1000);
            }else if(res.data == 2){
                this.setState({usernameTaken:true})
            }else if(res.data == 0){
                this.setState({error:true})
            }
          })
    }
    
    
    
    render(){
        if(this.state.redirectToLogin)
            return (<Redirect push to="/login" />)
        
        let passwordMismatch = this.state.passwordMismatch
        let usernameTaken = this.state.usernameTaken
        let subscribeSuccess = this.state.subscribeSuccess
        let error = this.state.error
        return (
            <div>
                <form onSubmit={this.sendSubscription}>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username"/>
                    {usernameTaken && <div>This username already exists.</div>}
                    {!usernameTaken && <div></div>}
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="E-mail"/>
                    <input type="password"  value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                    <input type="password"  value={this.state.confirmpassword} onChange={this.handleConfirmPasswordChange} placeholder="Confirm password"/>
                    {passwordMismatch && <div>The password does not match.</div>}
                    {!passwordMismatch && <div></div>}

                    {subscribeSuccess && <div>Subscribe successful.</div>}
                    {error && <div>Error</div>}
                    {!error && !subscribeSuccess && <div></div>}
                    <div>
                        <input type="submit" value="Sumbit"/>
                    </div>
                </form>
            </div>
        )
        
        
        
    }
}


export default Subscribe;