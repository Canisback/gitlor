import React from 'react';
import axios from 'axios';

import ConstantsList from './Constants';


class Explore extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div> Explore {this.props.match.params.id}</div>)
    }
}

export default Explore