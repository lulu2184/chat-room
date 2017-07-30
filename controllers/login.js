var sql = require('mysql');

module.exports = function(dbConnection) {
    var handler = {
        post: function(req, res) {
            console.log('receive login request.');
            console.log('data: ' + JSON.stringify(req.body));

            var query = 'select * from User where username = \'' + req.body.username + '\'';
            dbConnection.query(query, function(err, result){
                if (err) throw err;
                if (result.length == 0)
                    res.json({success: false, msg: 'User not found.'});
                else if (result[0].password != req.body.password)
                    res.json({success: false, msg: 'Password not correct.'});
                else
                    res.json({success: true, msg: 'success'});
            });
        }
    };
    return handler;
};
