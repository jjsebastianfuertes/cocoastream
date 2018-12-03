var request = require('request');
var cloudinary = require('cloudinary');


cloudinary.config({ 
  cloud_name: 'cocoastream', 
  api_key: '374781827885525', 
  api_secret: 'JX8B3MlwzJ2P2O0rSe4CHJDOxkk' 
});

var _showError = function (req, res, status){
  var title, content;

  if(status === 404){
    console.log("ejecuto el 404");
    title = "404, page not found";
    content = "Parece que están rodando este corto todavía";
  } else {
    title = status + ", se trabó el film 😥";
    content = "Vuelva más tarde..."
  }
  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
}


var apiOptions = {
  server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
  apiOptions.server = "https://cocoastream.herokuapp.com";
}




var renderVid = function(req, res, vid){

  var reproductor = cloudinary.video(vid.pathUrl, {controls:true});
  
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
    title: "CINE 📽️",
    videos: cineVids,
    message: msg
  });
}

var renderAnim = function(req, res, resBody){
  var animVids = [];
  var msg;
  if(!(resBody instanceof Array)){
    msg = "API lookup error ;(";
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
    title: "ANIMACION 🖊️",
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
    title: "T.V 📺",
    videos: tvVids,
    message: msg
  });
}

/*
module.exports.inicio = function(req,res){
  renderHomepage(req,res);
};

var renderHomepage = function(req,res){
  res.render('inicio', {title: 'COCOA STREAM'});
}*/
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
    if(response.statusCode === 200 ){
      renderCine(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }
    
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
   if(response.statusCode === 200 ){
     
    renderVid(req, res, body);
   } else {
    _showError(req, res, response.statusCode);
  }
   
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
    if(response.statusCode === 200 ){
      renderAnim(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }
    
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
    if(response.statusCode === 200 ){
      renderTv(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }
    
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
  res.render('editoradmin');
}

module.exports.subirvid = (req, res) => {
  
  console.log(req.files);
  var requestOptions, path, postdata, vid, foto, newVidName, newFotoname;
  foto = req.body.fotoItem;
  vid = req.body.videoItem;
 
  newFotoname = "cine/thumbnails"+req.body.titulo
  newVidName = "cine/videos"+req.body.titulo;
  cloudinary.v2.uploader.upload(foto, {public_id: newFotoname},
    function(err, res) {console.log(res, err)});
  cloudinary.v2.uploader.upload(vid, {resource_type: "video" ,public_id: newVidName},
  function(err, res) {console.log(res, err)});
  path = "/api/videos";
  postdata = {
    nombre: req.body.titulo,
    tipo: "peli",
    categoria: "cine",
    thumbnail:newFotoname,
    pathUrl: newVidName,
    genero: req.body.genero,
    director: req.body.director,
    productor: req.body.productor,
    cast: req.body.elenco
  };
  
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json: postdata
  };

  if(!postdata.nombre || !postdata.thumbnail || !postdata.pathUrl){
    res.redirect('/admin/perfiladmin/?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body){
        if(response.statusCode === 201){
          res.redirect('/admin/perfiladmin');
        } else if(response.statusCode === 400 && body.name && body.name === "ValidationError" ){
          res.redirect('/admin/perfiladmin/?err=val');
        } else {
          _showError(req, res, response.statusCode );
        }
      }
    );
  }
}
//suirvideoadmin page
module.exports.subirvideoadmin = (req, res) => {
  res.render('subirvideoadmin')
}
//crearadmin page
module.exports.crearadmin = (req, res) => {
  res.render('crearadmin')
}
