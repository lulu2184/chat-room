exports.loginHandler = function(req, res) {
    console.log('receive login request.');
    console.log('data: ' + JSON.stringify(req.body));
    res.json(req.body);
};