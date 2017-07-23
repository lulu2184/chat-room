var routes = require('./handlers');

module.exports = function(app) {
    app.get('/',routes.index);
};