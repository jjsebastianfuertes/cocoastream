var express = require('express');
var router = express.Router();
let ctrlUser = require('../controllers/usuarios')

/* GET users listing. */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
