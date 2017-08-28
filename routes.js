module.exports = function(app, dbConnection) {
    app.get('/', function(req, res) {
        console.log('session: ' + req.session.user);
        if (req.session.user != undefined) {
            res.render('chat', {username: req.session.user});
        } else {
            res.render('login');
        }
    });

    app.get('/register', function(req, res) {
        res.render('register');
    });

    var loginHandler = require('./controllers/login')(dbConnection);
    app.post('/login', loginHandler.post);

    var registerHandler = require('./controllers/register')(dbConnection);
    app.post('/register', registerHandler.post);

    app.get('/logout', function(req, res) {
        req.session.user = undefined;
        res.redirect('/');
    })
};
