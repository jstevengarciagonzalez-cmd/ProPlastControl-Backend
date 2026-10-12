const express = require('express');
const router = express.Router();
const ordenProduccionController = require('../controllers/ordenProduccionController');

router.get('/', ordenProduccionController.obtenerOrdenes);
router.get('/:id', ordenProduccionController.obtenerOrdenPorId);
router.post('/', ordenProduccionController.crearOrden);
router.put('/:id', ordenProduccionController.actualizarOrden);
router.delete('/:id', ordenProduccionController.eliminarOrden);

module.exports = router;