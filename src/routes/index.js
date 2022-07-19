const router  = require('express').Router();
const controller = require('../controller/index');

//rutas
router.get('/', controller.index);
router.get('/users', controller.users)
router.get('/map', controller.map);
router.get('/login', controller.sesion)
router.get('/formvisita', controller.visita)
router.get('/registro', controller.registro)

router.post('/registrar', controller.registrar)
router.post('/formvisita/rvisita', controller.rvisita)

module.exports = router;