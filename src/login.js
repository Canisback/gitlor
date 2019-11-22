const db = require("./db.js")


this.subscribe = function(req, res){
    
    db.createUser(req.body.username, req.body.email, req.body.password, function(result, response){
        if(result == true){
            res.send("1")
        }else{
            if(response.code == 11000){
                res.send("2")
            }else{
                res.send("0")
            }
        }
    })
    
}


this.login = function(req, res){
    
    db.comparePassword(req.body.username, req.body.password, function(result, response, value){
        if(result == true){
            if(response){
                req.session.username = value.username
                req.session.userId = value._id
                res.send("1")
            }else{
                res.send("2")
            }
        }else{
            res.send("0")
        }
    })
    
}

this.info = function(req, res){
    res.send(req.session.username)
}

this.logout = function(req, res){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                res.send("0")
            } else {
                res.send("1")
            }
        });
    }
}