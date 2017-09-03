var path = require('path');
var bodyParser = require('body-parser');

var http = require('http');
var express = require('express');
var sql = require('mysql');
var app = express();
var session = require('express-session');

var sockets = require('socket.io');

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require("ejs").__express);
app.set('view engine', 'html');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'aljialdsjfan.ajfsdf',
    cookie: { maxAge: 60 * 60 * 30 }
}));

//database connection configuration
var dbConfig = {
    user: 'chatroom',
    password: 'fse18652',
    server: 'localhost',
    database: 'ChatRoom'
};
var dbConnection = new sql.createConnection(dbConfig);

var server = http.createServer(app);
var io = sockets.listen(server);

var routes = require('./routes')(app, dbConnection, io);

dbConnection.connect(function(err){
    if (err) throw err;
    console.log('Connected to database.');

    server.listen(3000, function(){
        console.log('Server started on port 3000');
    });

    io.on("connection", function(socket) {
        console.log('new socket connect.');
        socket.on("send_msg", function(data) {
            console.log('received msg from ' + data.user + ': ' + data.msg);

            timestamp = new Date();
            console.log('at time: ' + timestamp);

            randomId = Math.floor(Math.random() * 1000000001);
            var query = sql.format('insert into Message (username, content, sentTime, randomId) values(?, ?, ?, ?)',
                [ data.name, data.msg, timestamp.getTime(), randomId ]);
            console.log('query: ' + query);
            dbConnection.query(query, function(err, result) {
                if (err) throw err;
                console.log('Message inserted to database.');
            });

            var msg = { user: data.name,
                        msg: data.msg,
                        time: timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString()};

            socket.broadcast.emit('broadcast_msg', msg);
            socket.emit('broadcast_msg', msg);
        });
    });
});
