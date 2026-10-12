// [RUTAS] Express Router y controladores de Proveedores
const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

// [ENDPOINTS] Rutas del CRUD de Proveedores
router.get('/', proveedorController.obtenerProveedores);
router.get('/:id', proveedorController.obtenerProveedorPorId);
router.post('/', proveedorController.crearProveedor);
router.put('/:id', proveedorController.actualizarProveedor);
router.delete('/:id', proveedorController.eliminarProveedor);

// [EXPORT] Exportar el enrutador
module.exports = router;