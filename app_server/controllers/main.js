var request = require('request')

const apiOptions = {
  server : 'http://localhost:3000'
};

//si la aplicacion corre en modo de produccion
//establecer diferente URL base
//cambiar a la direccion en linea
if (process.env.NODE_ENV === 'production') {
  apiOptions.server =  'https://cocoastream.herokuapp.com';
}

//home page
var renderHomePage = function(req, res){
  res.render('index', {title:'COCOASTREAM'});
};
module.exports.inicio =  (req, res) => {
    var requestOptions, path;
    path = '/api/videos';
    requestOptions = {
      url : apiOptions.server + path,
      method: "GET",
      json: {},
    };
    request(
      requestOptions,
      function(err, response, body){
        renderHomePage(req,res);
      }
    );
};

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
  res.render('cine', {title: 'Cine'});
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
