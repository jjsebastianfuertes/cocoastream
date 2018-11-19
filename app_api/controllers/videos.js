var mongoose = require('mongoose');
var Vid = mongoose.model('video');

var sendJsonResponse = function (res, status, content) {
	res.status(status);
	res.json(content);
}
module.exports.videosCreate = function (req, res) {
	//console.log(req.body);
	//sendJsonResponse(res, 201, req.body );
	//console.log(JSON.stringify(req.body))


	Vid.create({
		
		tipo: req.body.tipo,
		categoria: req.body.categoria,
		genero: req.body.genero.split(","),
		nombreSerie: req.body.nombreSerie,
		nombre: req.body.nombre,
		thumbnail: req.body.thumbnail,
		pathUrl: req.body.pathUrl,
		creditos: {
			cast: req.body.cast.split(","),
			creador: req.body.creador,
			director: req.body.director,
			productor: req.body.productor
		} 
	}, function(err, vid) {
		if(err){
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, vid);
		}
		
});

	
	///sendJsonResponse(res, 200,{"status":"success"}); 
	};
module.exports.videosList = function (req, res) { 
	//sendJsonResponse(res, 200,{"status":"success"});
	Vid.
		find({}, function(err, videos){
			let vids = {};

			videos.forEach(function(video){
				vids[video._id] = video;
			});
		}).exec(function(err, video){
			sendJsonResponse(res, 200, video);
		});
	};


module.exports.videosReadOne = function (req, res) { 
	Vid
		.findById(req.params.videoid)
		.exec(function(err, video){
			sendJsonResponse(res, 200,video);
		});
		
	
	};
module.exports.videosUpdateOne = function (req, res) { 
	//sendJsonResponse(res, 200,{"status":"success"});
	};
module.exports.videosDeleteOne = function (req, res) { 
	sendJsonResponse(res, 200,{"status":"success"});
	};


	//catching errors
	module.exports.videosReadOne = function(req, res){
		if (req.params && req.params.videoid){
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