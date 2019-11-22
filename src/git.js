const db = require("./db.js")


this.createProject = function(req, res){
    if(!"_id" in req.session){
        res.send("2")
    }else{
        db.createProject(req.session.id, req.body.name, function(result, item){
            if(result == true){
                res.send(item.ops[0]._id)
            }else{
                if(response.code == 11000){
                    res.send("2")
                }else{
                    res.send("0")
                }
            }
        })
    }
}

this.getProject = function(req, res){
    db.getProject(req.params.id, function(result, item){
        if(result){
            res.send(item)
        }else{
            res.send("0")
        }
    })
}

this.createCommit = function(req, res){
    let projectId = req.body.projectId
    let userId = req.session._id
    
    db.getProject(req.body.id, function(result, item){
        if(result){
            if(item.ops[0].user == userId){
                let cards = req.body.cards
                if(!Array.isArray(cards)){
                    res.send("2")
                    return
                }
                let description = req.body.description
                let guide = req.body.guide
                let commits = item.ops[0].commits
                db.createCommit(projectId, userId, cards, description, guide, function(result, item){
                    if(result){
                        commits.push(item.ops[0]._id)
                        db.updateProject(projectId, cards, description, guide, commits, function(result, item){
                            res.send("1")
                        })
                    }
                })
            }
        }else{
            res.send("0")
        }
    })
}

this.exploreProjects = function(req, res){
    let skip = 0
    if("page" in req.params)
        skip = req.params.page*10
    db.exploreProjects(function(result){
        res.send(result)
    },skip)
}