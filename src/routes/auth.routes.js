const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

// Rutas públicas de autenticación
router.post('/registro', authController.registro);
router.post('/login', authController.login);

// Ruta protegida para consultar el perfil del usuario autenticado
router.get('/perfil', verificarToken, (req, res) => {
  res.status(200).json({
    mensaje: 'Perfil validado correctamente',
    usuario: req.usuario
  });
});

// Ruta protegida exclusiva para rol 'admin' (lista de usuarios registrados)
router.get('/usuarios', verificarToken, soloAdmin, authController.obtenerUsuarios);
router.delete('/usuarios/:id', verificarToken, soloAdmin, authController.eliminarUsuario);

module.exports = router;