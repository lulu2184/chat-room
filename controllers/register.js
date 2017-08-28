var sql = require('mysql');

module.exports = function(dbConnection) {
    var handler = {
        post: function(req, res) {
            console.log('receive login request.');
            console.log('data: ' + JSON.stringify(req.body));

            var query = sql.format('insert ignore into User (username, password, email) values(?, ?, ?)',
                [req.body.username, req.body.password, req.body.email]);
            console.log(query);
            dbConnection.query(query, function(err, result){
                if (err) throw err;
                console.log(JSON.stringify(result));
                if (result.affectedRows == 0) {
                    res.json({success: false, msg: 'Username is already taken.'});
                } else {
                    req.session.user = req.body.username;
                    res.json({success: true, msg: 'Successfully signed up.'});
                }
            });
        }
    };
    return handler;
};
