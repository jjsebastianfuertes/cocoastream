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
