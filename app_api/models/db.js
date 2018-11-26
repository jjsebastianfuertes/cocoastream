var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI= 'mongodb://localhost/cocoastreamdb';

if(process.env.NODE_ENV === 'production'){
	dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI,{useCreateIndex: true, useNewUrlParser: true});

//monitorear por conexion exitosa por medio de mongoose
mongoose.connection.on('connected',function(){
	console.log('Mongoose connected to '+ dbURI);
});

//revisar por algun error de conexion 
mongoose.connection.on('error',function(err){
	console.log('Mongoose connection error:'+ err);
});

//revisar cuando se desconecta
mongoose.connection.on('disconnected',function(){
	console.log('Mongoose disconnected');
});


//cerrar la conexion de mongoose, 
//por medio de una funcion anonima
//que corre al cerrar
gracefulShutdown = function(msg,callback){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' +msg);
		callback();
	});
};

//terminacion de la app para nodemon
process.once('SIGUSR2', function(){
	gracefulShutdown('nodemon restart',function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});

//terminaci[on de la app
process.on('SIGINT', function(){
	gracefulShutdown('app termination',function(){
		process.exit(0);
	});
});

//terminacion de la app para Heroku
process.on('SIGTERM', function(){
	gracefulShutdown('Heroku app shutdown',function(){
		process.exit(0);
	});
});

require('./videos');
require('../../app_server/models/usuarios');