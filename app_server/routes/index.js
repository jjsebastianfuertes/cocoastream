const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.inicio);
router.get('/nosotros', ctrlMain.nosotros);
router.get('/contactanos', ctrlMain.contactanos);
router.get('/cine', ctrlMain.cine);
router.get('/animacion', ctrlMain.animacion);
router.get('/tv', ctrlMain.tvProduccion);


module.exports = router;