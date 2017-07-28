var path = require('path');
var bodyParser = require('body-parser');

var http = require('http');
var express = require('express');
var app = express();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require("ejs").__express);
app.set('view engine', 'html');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var routes = require('./routes')(app);

http.createServer(app).listen(3000, function(){
    console.log('Server started on port 3000');
});
