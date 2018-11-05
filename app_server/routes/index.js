const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.inicio);

//nosotros pages
router.get('/nosotros', ctrlMain.nosotros);

//contactanos pages
router.get('/contactanos', ctrlMain.contactanos);

//cine pages
router.get('/cine', ctrlMain.cine);

//animacion pages
router.get('/animacion', ctrlMain.animacion);

//tv pages
router.get('/tv', ctrlMain.tvProduccion);

//menu pages
router.get('/menu', ctrlMain.menu);

//admin pages
router.get('/admin', ctrlMain.admin);

//leonardo pages  ... borrar luego de presentacion
router.get('/leonardo', ctrlMain.leonardo);
//Perfil admin pages
router.get('/admin/perfiladmin', ctrlMain.perfiladmin);

//editor admin pages
router.get('/admin/editoradmin', ctrlMain.editoradmin);


module.exports = router;