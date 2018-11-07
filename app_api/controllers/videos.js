var mongoose = require('mongoose');
var Vid = mongoose.model('video');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
}
module.exports.videosCreate = function (req, res) {
	sendJsonResponse(res, 200,{"status":"success"}); 
	};
module.exports.videosList = function (req, res) { 
	sendJsonResponse(res, 200,{"status":"success"});
	};


module.exports.videosReadOne = function (req, res) { 
	Vid
		.findById(req.params.videoid)
		.exec(function(err, video){
			sendJsonResponse(res, 200,video);
		});
		
	
	};
module.exports.videosUpdateOne = function (req, res) { 
	sendJsonResponse(res, 200,{"status":"success"});
	};
module.exports.videosDeleteOne = function (req, res) { 
	sendJsonResponse(res, 200,{"status":"success"});
	};


	//catching errors
	module.exports.videosReadOne = function(req, res){
		if (req.param && req.params.videoid){
			Vid
				.findById(req.params.videoid)
				.exec(function(err, video){
					if(!video){
						sendJsonResponse(res, 404, {
							"message": "locationid not found"
						});
						return;
					} else if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 200, video);
				});
		}else{
			sendJsonResponse(res, 404, {
				"message": "No videoid in request"
			});
		}
	};