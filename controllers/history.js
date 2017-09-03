var sql = require('mysql');

module.exports = function(dbConnection) {
    var handlers = {
        post: function(req, res) {
            console.log(req.body);
            var timestamp = (new Date(req.body.lastTime)).getTime();

            var query = sql.format('select * from Message' +
                ' where (sentTime < ? or (sentTime = ? and randomId < ?))' +
                ' order by sentTime desc, randomId desc' +
                ' limit 15', [timestamp, timestamp, req.body.randomId]);
            console.log('query: ' + query);
            dbConnection.query(query, function(err, result) {
                if (err) throw err;
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    var ttime = new Date(result[i].sentTime);
                    result[i].sentTime = ttime.toLocaleDateString() + ' ' + ttime.toLocaleTimeString();
                }
                res.json({ msg: result });
            });
        }
    };
    return handlers;
};
