import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';



import App from './App';




class Subscribe extends React.Component{
    render(){
        return (
        <div>
            Gitlor Subscribe
        </div>
        )
    }
}

ReactDOM.render((<BrowserRouter><App/></BrowserRouter>), document.getElementById('app'))
