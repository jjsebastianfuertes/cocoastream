<<<<<<< HEAD
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
//subir video admin page
module.exports.subirvideo = (req, res) => {
  res.render('subirvideo')
}
//editor admin page
module.exports.editoradmin = (req, res) => {
  res.render('editoradmin')
}
=======
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
>>>>>>> f59540f0dc7c2f5a7c7f0c18a7d3e724e7630afe
