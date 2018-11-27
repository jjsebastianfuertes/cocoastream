var request = require('request');

var apiOptions = {
  server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
  apiOptions.server = "https://cocoastream.herokuapp.com";
}

var renderVideos = function(req, res, resBody){
  var cineVids = [];
  var msg;
  if(!(resBody instanceof Array)){
    msg = "API lookup error ;(";
    //resBody = [];
  } else if(!resBody.length){
    msg = "No hay pelis todavía ;("
  } else {
    resBody.forEach(vid => {
      if(vid.categoria == "cine"){
        cineVids.push(vid);
      }
    });
  }
    
  

    res.render('cine', {
    //link: './leonardo',
    //imageSrc: './img/img7.svg'
    videos: cineVids,
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
    renderVideos(req, res, body);
   }
 );
}

//animacion page
module.exports.animacion = (req, res) => {
  res.render('animacion', {title: 'Animación'})
}

//tv page
module.exports.tvProduccion = (req, res) => {
  res.render('tv', {title: 'T.V. Producción'})
}

//menu page
module.exports.menu = (req, res) => {
  res.render('menu')
}

//admin page
module.exports.admin = (req, res) => {
  res.render('admin')
}
//leonardo page ... borrar despues de presentacion
module.exports.leonardo = (req, res) => {
  res.render('leonardo')
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
