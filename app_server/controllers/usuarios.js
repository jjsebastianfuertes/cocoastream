var mongoose = require('mongoose');
var User = mongoose.model('user');

var sendJsonResponse = function(req, res){
    res.status(status);
    res.json(content);
}


