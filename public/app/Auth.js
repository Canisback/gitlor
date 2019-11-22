import axios from 'axios';

import ConstantsList from './Constants';

class Auth {
    
    constructor(){
        this.username = ""
        this.loggedIn = false
        this.observers = []
    }
    
    update(callback){
        var _this = this
        axios.get(ConstantsList.SERVER_URL + "api/authInfo")
          .then(res => {
            if(res.data.length > 0){
                _this.username = res.data
                _this.loggedIn = true
            }else{
                _this.username = ""
                _this.loggedIn = false
            }
            callback()
            for(var i in _this.observers)
                _this.observers[i].notify()
        })
    }
    
    attach(observer){
        this.observers.push(observer)
    }
    
}

export default new Auth();