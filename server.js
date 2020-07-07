var express = require("express");
var app = express();


/******************************************* */
/***Server Configuration */
/******************************************* */

// render HTML frm the endpoints
var ejs = require('ejs');
app.set('views', __dirname + "/public");
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

//server static file (css, js, img, pdf)
app.use(express.static(__dirname + '/public'));

//configure body-paser to read req payload
var bparser= require('body-parser');
app.use(bparser.json());

//DB connection to Mongo DB
var mongoose = require('mongoose');
mongoose.connect("mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var mongoDB = mongoose.connection; //DB connection
var itemDB; // is the obj contructor


/******************************************* */
/***Server HTML */
/******************************************* */

app.get('/', function(req, res){
    res.render('index.html');
});

// create the /admin endpoint
//server the admin.html
app.get('/admin', function(req,res){
    res.render('admin.html');
});

app.get('/about', function(req, res){
    res.send('<h1 style="color:red">Gerry Squirewell</h1>');
});

app.get('/contact', function(req, res){
    res.send('<h2 style="color:blue">contact us at: gasquirewell@gmail.com</h2>');
});

/****************************************** */
/***API endpoints************************** */
/****************************************** */
var list= [];

app.post('/API/items', function(req, res){
    var item = req.body;


    //create a db obj
    var itemForFB = itemDB(item);


    //save the obj on the db
    itemForFB.save(function(error, savedObject){
        if(error){
            //something went wrong
            console.log("Error saving the item: " + error);
            res.status(500); // Internal Server Error
            res.send(error); // = return
        }

        // no error
        res.status(201); // 201 = OK created
        res.json(savedObject);
    });
});

app.get('/API/items', function(req,res){
    itemDB.find({}, function(error, data){
       if(error){
            res.status(500);
            res.send(error);
       }
        // no error
        res.json(data);
    });
});


mongoDB.on('error', function(error){
    console.log("Error connection to DB:" + error);
});

mongoDB.on('open', function(){
    console.log("Yesssss! DB connection successful");

    //predefined schema for items table(collection) --SQL database
    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        user: String
    });

    var itemDB = mongoose.model("catalogCh9", itemSchema);
});



//start project
app.listen(8080, function(){
    console.log("Server running at localhost:8080");
});

//Ctrl + c: to kill server

//ERROR CODES
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// https://www.restapitutorial.com/httpstatuscodes.html

// please contact me at my@mail.com


//API -> Application Programming Interface


// 108 Angular
