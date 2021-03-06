var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('user');

var sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
}

module.exports.register = (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {
            "message": "All fields are required"
        });
        return;
    }

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.categoria = req.body.categoria;

    user.setPassword(req.body.password);

    user.save(function(err){
        var token;

        if(err){
            sendJSONresponse(res, 400, err);
        } else {
            token = user.generateJWT();
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};


module.exports.login = function(req, res){
    if(!req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {
            "message": "All fields are required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;

        if (err){
            sendJSONresponse(res, 404, err);
            return;
        }

        if(user){
            token = user.generateJWT();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};