// Initializing node modules
var express = require('express');
var bodyParser = require('body-parser');
var mssql = require('mssql');
var db = require('./db');
var app = express();

// Body middleware
app.use(bodyParser.json());

// CORS middlware
app.use(function(request, response, next) {
    // Enabling CORS
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization');
    next();
});

// Setting up server
var port = process.env.PORT || 8080;

var server = app.listen(port, function() {    
    console.log('App now running on port: ' + port);
});

// Function to connect to database and execute query
var executeQuery = function(response, query) {
    mssql.connect(db, function(error) {
        if(error) {
            console.log('Error while connecting database: ' + error);
            response.send(error);
        }
        else {
            // Create request object
            var request = new mssql.Request();

            // Query to the database
            request.query(query, function(error, recordSet) {
                if(error) {
                    console.log('Error while querying database: ' + error);
                    response.send(error);
                }
                else {
                    response.send(recordSet);
                }
            });
        }
    });
};

// GET API
app.get('/api/survey', function(request, response) {
    var query = "select * from survey";
    executeQuery(response, query);
});

// GET API
app.get('/api/survey/:id', function(request, response) {
    var query = "select * from survey where sid = '"+ request.params.id +"'";
    executeQuery(response, query);
});

// POST API
app.post('/api/survey', function(request, response) {
    var query = "insert into survey (title) values ('" + request.body.title + "')";
    executeQuery(response, query);
});

// PUT API
app.put('/api/survey/:id', function(request, response) {
    var query = "update survey set title = '"+ request.body.title +"' where sid = '"+ request.params.id +"'";
    executeQuery(response, query);
});

// DELETE API
app.delete('/api/survey/:id', function(request, response) {
    var query = "delete from survey where sid = '"+ request.params.id +"'";
    executeQuery(response, query);
});