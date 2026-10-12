// [RUTAS] Express Router y controladores
const express = require('express');
const router = express.Router();
const materiaPrimaController = require('../controllers/materiaPrimaController');

// [ENDPOINTS] Rutas del CRUD de Materia Prima
router.get('/', materiaPrimaController.obtenerMateriasPrimas);
router.get('/:id', materiaPrimaController.obtenerMateriaPrimaPorId);
router.post('/', materiaPrimaController.crearMateriaPrima);
router.put('/:id', materiaPrimaController.actualizarMateriaPrima);
router.delete('/:id', materiaPrimaController.eliminarMateriaPrima);

// [EXPORT] Exportar el enrutador
module.exports = router;