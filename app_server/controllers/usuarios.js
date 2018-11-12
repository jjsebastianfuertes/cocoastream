var mongoose = require('mongoose');
var User = mongoose.model('user');

var sendJsonResponse = function(req, res){
    res.status(status);
    res.json(content);
};


module.exports.usersCreate = function(req, res){

    sendJsonResponse(res, 200,{"status":"success"}); 
};

module.exports.usersList = function(req, res){

    sendJsonResponse(res, 200,{"status":"success"}); 
};

module.exports.usersReadOne = function(req, res){

    User
        .findById(req.params.videoid)
        .exec(function(err, video){
            sendJsonResponse(res, 200,video);
        });
};

module.exports.usersUpdateOne = function(req, res){

    sendJsonResponse(res, 200,{"status":"success"}); 
};

module.exports.usersDeleteOne = function(req, res){

    sendJsonResponse(res, 200,{"status":"success"}); 
};

