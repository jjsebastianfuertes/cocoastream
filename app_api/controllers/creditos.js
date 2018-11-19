var mongoose = require('mongoose');
var Vid = mongoose.model('video');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
}
module.exports.creditosCreate = function (req, res) {


	
	sendJsonResponse(res, 200,{"status":"success"}); 
	};




module.exports.creditosReadOne = function(req, res){
    if(req.params && req.params.videoid && req.params.creditoid){
        Vid
            .findById(req.params.videoid)
            .select('nombre creditos')
            .exec(
                function(err, video) {
                    var response,  credito;
                    if(!video){
                        sendJsonResponse(res, 404, {
                            "message": "videoid not found"
                        });
                        return;
                    }else if(err){
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    if(video.creditos && video.creditos.length > 0){
                        credito = video.creditos.id(req.params.creditoid);
                        if(!credito){
                            sendJsonResponse(res, 404, {
                                "message": "creditoid not found"
                            });
                        }else {
                            response = {
                                video : {
                                    nombre : video.nombre,
                                    id : req.params.videoid
                                },
                                credito : credito
                            };
                            sendJsonResponse(res, 200, response);
                        }
                    }else {
                        console.log(video.creditos);
                        sendJsonResponse(res, 404, {
                            "message" : "No videos found"
                        });
                    }
                }
            );
    }else {
        sendJsonResponse(res, 404, {
            "message" : "Not found, videoid and creditoid are both required"
        });
    }
};


module.exports.creditosUpdateOne = function (req, res) { 
	//sendJsonResponse(res, 200,{"status":"success"});
	};
module.exports.creditosDeleteOne = function (req, res) { 
	sendJsonResponse(res, 200,{"status":"success"});
	};


	//catching errors
	/*module.exports.creditosReadOne = function(req, res){
		if (req.param && req.params.creditoid){
			Video
				.findById(req.params.creditoid)
				.exec(function(err, credito){
					if(!credito){
						sendJsonResponse(res, 404, {
							"message": "locationid not found"
						});
						return;
					} else if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 200, credito);
				});
		}else{
			sendJsonResponse(res, 404, {
				"message": "No creditoid in request"
			});
		}
	};*/