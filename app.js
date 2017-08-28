var path = require('path');
var bodyParser = require('body-parser');

var http = require('http');
var express = require('express');
var sql = require('mysql');
var app = express();
var session = require('express-session');

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require("ejs").__express);
app.set('view engine', 'html');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'aljialdsjfan.ajfsdf',
    cookie: { maxAge: 60 * 1000 }
}));

//database connection configuration
var dbConfig = {
    user: 'chatroom',
    password: 'fse18652',
    server: 'localhost',
    database: 'ChatRoom'
};
var dbConnection = new sql.createConnection(dbConfig);

var routes = require('./routes')(app, dbConnection);

dbConnection.connect(function(err){
    if (err) throw err;
    console.log('Connected to database.');

    http.createServer(app).listen(3000, function(){
        console.log('Server started on port 3000');
    });

});
