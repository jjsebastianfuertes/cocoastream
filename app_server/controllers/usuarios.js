/*var mongoose = require('mongoose');
var User = mongoose.model('user');

var sendJsonResponse = function (res, status, content) {
	res.status(status);
	res.json(content);
}


module.exports.usersCreate = function(req, res){
    console.log(req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        categoria: req.body.categoria,
        

    });
 
    user.save(function(err){
        if(err){
            sendJsonResponse(res,401,err );
        }else{
           // user.setPassword(req.body.password);
            sendJsonResponse(res,200,user);
        }
    });
    

};

module.exports.usersList = function(req, res){

    sendJsonResponse(res, 200,{"status":"success"}); 
};


module.exports.usersReadOne = function(req, res){

    User
        .findById(req.params.userid)
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

*/