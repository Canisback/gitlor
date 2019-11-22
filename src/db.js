const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'gitlor';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });


let db;
let userCollection;
let projectCollection;
let commitCollection;

function connectDb(){
    client.connect(function(err) {
        console.log("Connected successfully to server");
        db = client.db(dbName);
        userCollection = db.collection('users');
        userCollection.createIndex( { "username": 1 }, { unique: true }, function(error) {
            if (error) {
                console.log(error)
            }
        });
        projectCollection = db.collection('projects');
        commitCollection = db.collection('commits');
        
    });
}

connectDb();

this.createUser = function(username, email, password, callback){
    bcrypt.hash(password, saltRounds, function(err, hash) {
        userCollection.insertOne({
            "username": username,
            "email": email,
            "password": hash
        },
        function(err) {
            if(!err) {
                callback(true);
            } else {
                callback(false, err);
            }
        });
    });
}


this.findUser = function(username, callback){
    userCollection.findOne({
        "username": username
    },
    function(err, item) {
        if(!err) {
            callback(true, item);
        } else {
            callback(false, err);
        }
    });
}


this.comparePassword = function(username, password, callback){
    this.findUser(username, function(result, response){
        bcrypt.compare(password, response.password, function(err, res) {
            if(!err) {
                callback(true, res, response);
            } else {
                callback(false, res);
            }
        });
    })
}


this.createProject = function(userId, name, callback){
    console.log(userId)
    let o_id = new mongo.ObjectID(userId)
    projectCollection.insertOne({
        "user":o_id,
        "name":name,
        "description":"",
        "commits":[],
        "cards":[],
        "guide":"",
        "createdAt":Date.now(),
        "lastUpdate":Date.now(),
        "forkOf":null
    },
    function(err, item) {
        if(!err) {
            callback(true, item);
        } else {
            callback(false, err);
        }
    })
}

this.getProject = function(projectId, callback){
    let o_id = new mongo.ObjectID(projectId)
    projectCollection.aggregate([
        { $match:{"_id":o_id}},
        {$lookup:
           {
             from: 'users',
             localField: 'user',
             foreignField: '_id',
             as: 'userDetails'
           }}
        ]).toArray(
        function(err, item){
            if(!err) {
                callback(true, item[0]);
            } else {
                callback(false, err);
            }
        })
    
}

this.updateProject = function(projectId, cards, description, guide, commits, callback){
    let o_id = new mongo.ObjectID(projectId)
    projectCollection.updateOne(
        {"_id":o_id},
        {$set:{
            "cards":cards,
            "description":description,
            "guide":guide,
            "commits":commits,
            "lastUpdate":Date.now()
        }},
        function(err, item){
            if(!err) {
                callback(true, item);
            } else {
                callback(false, err);
            }
        }
    )
}

this.createCommit = function(projectId, userId, cards, description, guide, callback){
    commitCollection.insertOne({
        "projectId":projectId,
        "userId":userId,
        "cards":cards,
        "description":description,
        "guide":guide,
        "createdAt":Date.now()
    },
    function(err, item) {
        if(!err) {
            callback(true, item);
        } else {
            callback(false, err);
        }
    })
}

this.exploreProjects = function(callback, skip=0){
    projectCollection
        .aggregate([
        { $lookup:
           {
             from: 'users',
             localField: 'user',
             foreignField: '_id',
             as: 'userDetails'
           }
         }
        ])
        .skip(skip)
        .limit(10)
        .toArray(function(err, result) {
        if (err) throw err;
        callback(result)
    });
}