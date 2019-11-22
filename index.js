const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var session = require('express-session');
const mongo = require('mongodb')


const db = require("./src/db.js")
const login = require("./src/login.js")
const git = require("./src/git.js")

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(session({secret: "gitlorbigsecret"}));
app.use(require('cookie-parser')());



app.post('/api/subscribe', (req, res) => login.subscribe(req, res))

app.post('/api/login', (req, res) => login.login(req, res))

app.get('/api/logout', (req, res) => login.logout(req, res))

app.get('/api/authInfo', (req, res) => login.info(req, res))

app.get('/api/getProject/:id', (req, res) => git.getProject(req, res))

app.post('/api/createProject', (req, res) => git.createProject(req, res))

app.get('/api/getCommit/:id', (req, res) => git.getCommit(req, res))

app.post('/api/createCommit', (req, res) => git.createCommit(req, res))

app.get('/api/exploreProjects', (req, res) => git.exploreProjects(req, res))

app.get('/api/exploreProjects/:page', (req, res) => git.exploreProjects(req, res))

app.get('/api/test', function(req, res){
    
    //test
    let userId = mongo.ObjectID("5dd518a80aaea906575427bd")
    console.log(userId)
    db.createProject(userId, "Test Project", function(result, item){
        let commits = item.ops[0].commits
        let cards = [0,1,2]
        let description = "description"
        let guide = "guide"
        let projectId = item.ops[0]._id
        console.log("projectId", projectId)
        db.createCommit(projectId, userId, cards, description, guide, function(result, item){
            console.log("commitId", item.ops[0]._id)
            
            if(result){
                console.log("commits", commits)
                console.log("add commit", item.ops[0]._id)
                commits.push(item.ops[0]._id)
                console.log("commits", commits)
                db.updateProject(projectId, cards, description, guide, commits, function(result, item){
                    res.send("1")
                })
            }
        })
    })
    //res.send("ok")
})
app.get('/api/test2', function(req, res){
    let userId = mongo.ObjectID("5dd518a80aaea906575427bd")
    let projectId = mongo.ObjectID("5dd7e2f6c895a62cf491fcaf")
    db.getProject(projectId, function(result, item){
        if(result){
            let commits = item.commits
            let cards = [2,3,4]
            let description = "description updated"
            let guide = "guide updated"
            console.log("projectId", projectId)
            db.createCommit(projectId, userId, cards, description, guide, function(result, item){
                console.log("commitId", item.ops[0]._id)

                if(result){
                    console.log("commits", commits)
                    console.log("add commit", item.ops[0]._id)
                    commits.push(item.ops[0]._id)
                    console.log("commits", commits)
                    db.updateProject(projectId, cards, description, guide, commits, function(result, item){
                        res.send("1")
                    })
                }
            })
        }
    })
})


app.get('*', function (req, res) {
    console.log("connection")
    console.log(req.session.username)
    res.sendFile(__dirname + '/public/app.html')

})





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
