var routes = require('./controllers');

module.exports = function(app, dbConnection) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/register', function(req, res) {
        res.render('register');
    });

    var loginHandler = require('./controllers/login')(dbConnection);
    app.post('/login', loginHandler.post);

    var registerHandler = require('./controllers/register')(dbConnection);
    app.post('/register', registerHandler.post);
};
