const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlAuth = require('../controllers/auth');

var multer = require('multer');

const parser = multer();

var conf = parser.fields([
    {name: 'fotoItem', maxCount: 1}, 
    {name: 'videoItem', maxCount: 1}, 
  ]);


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
//router.get('/leonardo', ctrlMain.leonardo);

router.get('/cine/:videoid', ctrlMain.videoShow);

router.get('/animacion/:videoid', ctrlMain.videoShow);

router.get('/tv/:videoid', ctrlMain.videoShow);
//Perfil admin pages
router.get('/admin/perfiladmin', ctrlMain.perfiladmin);

//editor admin pages
router.get('/admin/editoradmin', ctrlMain.editoradmin);

//subir video admin pages
//router.get('/admin/subirvideoadmin', ctrlMain.subirvideoadmin);
router.post('/admin/editoradmin',conf, ctrlMain.subirvid);

//crearadmin pages
router.get('/admin/crearadmin', ctrlMain.crearadmin);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;