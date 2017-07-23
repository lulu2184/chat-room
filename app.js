var http = require('http');
var express = require('express');
var app = express();

var routes = require('./routes')(app);

http.createServer(app).listen(3000, function(){
   console.log('Server started on port 3000');
});
