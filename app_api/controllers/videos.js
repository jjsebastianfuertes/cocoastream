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
			if(video){
				sendJsonResponse(res, 200,video);
			}else {
				sendJsonResponse(res, 400, err );
			}
		});
		
	
	};
module.exports.videosUpdateOne = function (req, res) { 
	if(!req.params.videoid){
		sendJsonResponse(res, 404, {
			"message": "Not found, videoid is required"
		});
		return;
	}
	Vid
		.findById(req.params.videoid)
		.exec(
			function(err, video){
				if(!video){
					sendJsonResponse(res, 404, err);
					return;
				} else if(err){
					sendJsonResponse(res, 400, err);
					return;
				}
				console.log(req.body.pathUrl);
				//sendJsonResponse(res, 200, req.body)
				if(req.body.tipo != null ) video.tipo = req.body.tipo;
				if(req.body.categoria != null )video.categoria = req.body.categoria;
				if(req.body.genero != null ) video.genero = req.body.genero.split(",");
				if(req.body.nombreSerie != null )video.nombreSerie = req.body.nombreSerie;
				if(req.body.nombre != null )video.nombre = req.body.nombre;
				if(req.body.thumbnail != null ) video.thumbnail = req.body.thumbnail;
				if(req.body.pathUrl != null )video.pathUrl = req.body.pathUrl;
				if(req.body.cast != null ) {var rCast = req.body.cast.split(",");} else var rCast = video.creditos.cast;
				if(req.body.creador != null) {var rCreador = req.body.creador;} else var rCreador = video.creditos.creador;
				if(req.body.director != null) {var rDirector = req.body.director;} else var rDirector = video.creditos.director;
				if(req.body.productor != null) {var rProductor = req.body.productor;} else var rProductor = video.creditos.productor;
				video.creditos = {
					cast: rCast,
					creador: rCreador,
					director: rDirector,
					productor: rProductor
					};
				video.save(function(err, video){
					if(err){
						sendJsonResponse(res, 404, err);
					}else {
						sendJsonResponse(res, 200, video);
					}
				});

			}
		);


	};
	module.exports.videosDeleteOne = function (req, res) { 

	/*if(!req.params.videoid){
		sendJsonResponse(res, 404, {
			"message": "Not found, videoid is required"
		});
		return;
	}
	Vid.findByIdAndRemove(req.params.videoid, function(err, video) {
		// As always, handle any potential errors:
		if (err) sendJsonResponse(res, 500, err);
		if(video){
			const response = {
				message: "Todo successfully deleted",
				id: video._id,
				nombre: video.nombre
			};
			sendJsonResponse(res, 200, response);
		}
	});*/

	var videoId = req.params.videoid;
	if(videoId){
		Vid
			.findByIdAndRemove(videoId)
			.exec(
				function(err, video){
					if(err){
						sendJsonResponse(res, 404, err);
						return;
					}
					const response = {
						message: "Successfully deleted",
						
					};
					sendJsonResponse(res, 204, response);
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message": "No videoid"
		});
	}
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