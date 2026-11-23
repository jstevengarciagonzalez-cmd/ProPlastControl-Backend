const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ProPlastControl_Secreto_2026';

// Verifica que la petición traiga un token JWT válido
exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({
      mensaje: 'Acceso denegado: no se proporcionó un token de autenticación'
    });
  }

  try {
    const decodificado = jwt.verify(token, JWT_SECRET);
    req.usuario = decodificado;
    next();
  } catch (error) {
    return res.status(403).json({
      mensaje: 'Token inválido o expirado'
    });
  }
};

// Verifica que el usuario autenticado tenga rol 'admin'
exports.soloAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'admin') {
    return res.status(403).json({
      mensaje: 'Acceso denegado: se requieren permisos de administrador'
    });
  }
  next();
};