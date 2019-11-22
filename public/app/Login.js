import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';
import ConstantsList from './Constants';
import Navbar from './Navbar';

import Auth from './Auth';

class Login extends React.Component{
    render(){
        return (
        <div>
            <Navbar/>
            Gitlor Login
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
        //Auth.update(function(){
            //console.log(Auth)
        //})
        this.state = {
            username: '',
            password: '',
            wrongCombination:false,
            loginSuccess:false,
            error:false,
            redirectToHome:false
        };

        this.sendLogin = this.sendLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }
    
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }
    
    
    sendLogin(event){
        event.preventDefault();
        this.setState({
            wrongCombination:false,
            error:false,
            loginSuccess:false
        })
        
        let data = {
            username: this.state.username,
            password: this.state.password
        };
        
        axios.post(ConstantsList.SERVER_URL + "api/login", data)
          .then(res => {
            if(res.data == 1){
                this.setState({loginSuccess:true})
                var that = this
                setTimeout(function(){
                    that.setState({"redirectToHome":true})
                    setTimeout(function(){
                        //window.location.reload();
                        Auth.update(function(){})
                    }, 100);
                }, 1000);
            }else if(res.data == 2){
                this.setState({wrongCombination:true})
            }else if(res.data == 0){
                this.setState({error:true})
            }
          })
    }
    
    
    
    render(){
        if(this.state.redirectToHome)
            return (<Redirect push to="/" />)
        
        let wrongCombination = this.state.wrongCombination
        let loginSuccess = this.state.loginSuccess
        let error = this.state.error
        return (
            <form onSubmit={this.sendLogin}>
                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username"/>
                <input type="password"  value={this.state.password} onChange={this.handlePasswordChange}  placeholder="Password"/>
                {loginSuccess && <div>Login successful.</div>}
                {wrongCombination && <div>Wrong combination</div>}
                {error && <div>Error</div>}
                {!error && !loginSuccess && !wrongCombination && <div></div>}
                <div>
                    <input type="submit" value="LOGIN"/>
                </div>
            </form>
        )
        
        
        
    }
}


export { 
    Login,
    Form
};