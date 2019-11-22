import React from 'react';


class Project extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div> Project {this.props.match.params.id}</div>)
    }
}

export default Project