import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

import ConstantsList from './Constants';


class Explore extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "projects":[]
        }
    }
    
    componentDidMount(){
        
        var _this = this
        axios.get(ConstantsList.SERVER_URL + "api/exploreProjects")
          .then(res => {
            _this.setState({"projects":res.data})
        })
        
    }
    
    render(){
        let projectList = []
        for(var i in this.state.projects)
            projectList.push(<ProjectCard data={this.state.projects[i]} key={this.state.projects[i]._id} />)
        return (
            <div> 
                <Navbar/>
                Explore {this.props.match.params.id}<br /> {projectList}
            </div>)
    }
}

class ProjectCard extends React.Component {
    
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
                <Link to={'./project/'+this.props.data._id}>
                    {this.props.data.name}
                </Link>
            </div>
        )
        
    }
    
    
}

export default Explore