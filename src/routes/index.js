const router  = require('express').Router();
const controller = require('../controller/index');

//rutas
router.get('/', controller.index);
router.get('/users', controller.users)
router.get('/map', controller.map);
router.get('/login', controller.sesion)
router.get('/registro', controller.registro)
router.post('/registrar', controller.registrar)
router.get('/visita', controller.visita)
router.post('/rvisita', controller.rvisita)

module.exports = router;