const router  = require('express').Router();
const controller = require('../controller/index');

//rutas
router.get('/', controller.index);
router.get('/users', controller.users)
router.get('/map', controller.map);

module.exports = router;