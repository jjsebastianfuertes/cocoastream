var express = require('express');
var router = express.Router();
let ctrlUser = require('../controllers/usuarios')


router.get('/users', ctrlUser.usersList);
router.post('/users', ctrlUser.usersCreate);
router.get('/users/:userid', ctrlUser.usersReadOne);
router.put('/users/:usersid', ctrlUser.usersUpdateOne);
router.delete('users/:usersid', ctrlUser.usersDeleteOne);

module.exports = router;
