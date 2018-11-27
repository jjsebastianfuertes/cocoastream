var request = require('request');
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'cocoastream', 
  api_key: '374781827885525', 
  api_secret: 'JX8B3MlwzJ2P2O0rSe4CHJDOxkk' 
});

var apiOptions = {
  server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
  apiOptions.server = "https://cocoastream.herokuapp.com";
}

var renderVid = function(req, res, vid){

  var reproductor = cloudinary.video(vid.pathUrl, {controls:true});
  console.log(reproductor);
  vid.pathUrl = reproductor;
  res.render('video_show', {
     title: vid.nombre,
     pageHeader: {title: vid.nombre},
     video: vid
     });



}

var renderCine = function(req, res, resBody){
  var cineVids = [];
  var msg;
  //var link;
  if(!(resBody instanceof Array)){
    msg = "API lookup error ;(";
    //resBody = [];
  } else if(!resBody.length){
    msg = "No hay pelis todavía ;("
  } else {
    resBody.forEach(vid => {
      if(vid.categoria == 'cine'){
        let tempImg = cloudinary.image(vid.thumbnail);
        vid.thumbnail = tempImg;
        cineVids.push(vid);
      }
    });
  }
    res.render('cine', {
    videos: cineVids,
    message: msg
  });
}

var renderAnim = function(req, res, resBody){
  var animVids = [];
  var msg;
  //var link;
  if(!(resBody instanceof Array)){
    msg = "API lookup error ;(";
    //resBody = [];
  } else if(!resBody.length){
    msg = "No hay animaciones todavía ;("
  } else {
    resBody.forEach(vid => {
      if(vid.categoria == 'animacion'){
        let tempImg = cloudinary.image(vid.thumbnail);
        vid.thumbnail = tempImg;
        animVids.push(vid);
      }
    });
  }
    res.render('animacion', {
    videos: animVids,
    message: msg
  });
}


var renderTv = function(req, res, resBody){
  var tvVids = [];
  var msg;
  //var link;
  if(!(resBody instanceof Array)){
    msg = "API lookup error ;(";
    //resBody = [];
  } else if(!resBody.length){
    msg = "No hay series todavía ;("
  } else {
    resBody.forEach(vid => {
      if(vid.categoria == 'tv'){
        let tempImg = cloudinary.image(vid.thumbnail);
        vid.thumbnail = tempImg;
        tvVids.push(vid);
      }
    });
  }
    res.render('tv', {
    videos: tvVids,
    message: msg
  });
}


//home page
module.exports.inicio =  (req, res) => {
    res.render('index', { title: 'COCOA STREAM' });
  }

//nosotros page
module.exports.nosotros = (req, res) => {
  res.render('nosotros', {title: 'Nosotros'});
}

//contactanos page
module.exports.contactanos = (req, res) => {
  res.render('contactanos', {title: 'Contactanos'});
}

//cine page
module.exports.cine = (req, res) => {
 var requestOptions, path;
 path = '/api/videos';
 requestOptions = {
  url : apiOptions.server + path,
  method : "GET",
  json : {},
  qs : {
    categoria : 'cine'
  }
 };
 request(
   requestOptions, (err, response, body)=>{
    if(response.statusCode === 200 && body.lenght){

    }
    renderCine(req, res, body);
   }
 );
}

module.exports.videoShow = (req, res) => {
  var requestOptions, path;
  path = '/api/videos/'+req.params.videoid;
  requestOptions = {
  url : apiOptions.server + path,
  method : "GET",
  json : {},
  
 };
 request(
  requestOptions, (err, response, body)=>{
   if(response.statusCode === 200 && body.lenght){

   }
   renderVid(req, res, body);
  }
);
}

//animacion page
module.exports.animacion = (req, res) => {
  var requestOptions, path;
 path = '/api/videos';
 requestOptions = {
  url : apiOptions.server + path,
  method : "GET",
  json : {},
  qs : {
    categoria : 'animacion'
  }
 };
 request(
   requestOptions, (err, response, body)=>{
    if(response.statusCode === 200 && body.lenght){

    }
    renderAnim(req, res, body);
   }
 );
}

//tv page
module.exports.tvProduccion = (req, res) => {
  var requestOptions, path;
 path = '/api/videos';
 requestOptions = {
  url : apiOptions.server + path,
  method : "GET",
  json : {},
  qs : {
    categoria : 'tv'
  }
 };
 request(
   requestOptions, (err, response, body)=>{
    if(response.statusCode === 200 && body.lenght){

    }
    renderTv(req, res, body);
   }
 );
}

//menu page
module.exports.menu = (req, res) => {
  res.render('menu')
}

//admin page
module.exports.admin = (req, res) => {
  res.render('admin')
}

//perfil admin page
module.exports.perfiladmin = (req, res) => {
  res.render('perfiladmin')
}
//editor admin page
module.exports.editoradmin = (req, res) => {
  res.render('editoradmin')
}
//suirvideoadmin page
module.exports.subirvideoadmin = (req, res) => {
  res.render('subirvideoadmin')
}
//crearadmin page
module.exports.crearadmin = (req, res) => {
  res.render('crearadmin')
}
