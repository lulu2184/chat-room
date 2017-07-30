var routes = require('./controllers');

module.exports = function(app, dbConnection) {
    app.get('/', routes.index);

    var loginHandler = require('./controllers/login')(dbConnection);
    app.post('/login', loginHandler.post);
};
