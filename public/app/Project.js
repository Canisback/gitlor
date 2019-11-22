import React from 'react';
import axios from 'axios';
import ConstantsList from './Constants';
import { Redirect } from 'react-router-dom';

import Auth from './Auth';
import CardsDictionary from './CardsDictionary';
import Navbar from './Navbar';

class Project extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.match.params)
    }
    
    render(){
        if(this.props.match.params.id != undefined)
            return (
                <div>
                    <Navbar/>
                    <DisplayProject id={this.props.match.params.id} />
                </div>)
        else
            return (
                <div>
                    <Navbar/>
                    New Project
                    <NewProject />
                </div>)
    }
}

class NewProject extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            projectName:"",
            projectCreated:false,
            projectId:""
        }
        this.createProject = this.createProject.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(event){
        this.setState({projectName: event.target.value});
    }
    
    createProject(event){
        event.preventDefault();
        
        var _this = this
        axios.post(ConstantsList.SERVER_URL + "api/createProject", {"name":this.state.projectName})
          .then(res => {
            console.log(res.data)
            this.setState({"projectId":res.data,"projectCreated":true})
        })
    }
    
    
    render(){
        if(this.state.projectCreated)
            return (<Redirect push to={"/project/"+this.state.projectId} />)
        return(
            <div style={{"maxWidth":"300px"}}>
                <form onSubmit={this.createProject}>
                    <input type="text" value={this.state.projectName} onChange={this.handleNameChange} placeholder="Project name"/>

                    <div>
                        <input type="submit" value="Create"/>
                    </div>
                </form>
            </div>
        )
    }
    
}

class DisplayProject extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            "project":null
        }
    }
    
    componentDidMount(){
        
        var _this = this
        axios.get(ConstantsList.SERVER_URL + "api/getProject/" + this.props.id)
          .then(res => {
            console.log(res.data)
            _this.setState({"project":res.data})
        })
        
    }
    
    render(){
        if(this.state.project == null)
            return (<div>Loading</div>)
        else
            return(
                <div>
                    {this.state.project.name}<br />
                    By {this.state.project.userDetails[0].username}
                </div>
            )
    }
    
    
}

class Card extends React.Component{
    
    constructor(props){
        super(props)
    }
    render(){
        if("cardCode" in this.props)
            return <img src={ConstantsList.CARD_IMG_URL + this.props.cardCode +".png"} />
    }
    
}

export default Project