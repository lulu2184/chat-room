var routes = require('./controllers');
var login = require('./controllers/login');

module.exports = function(app) {
    app.get('/', routes.index);
    app.post('/login', login.loginHandler);
};