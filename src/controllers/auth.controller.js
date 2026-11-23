const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ProPlastControl_Secreto_2026';

// Registro de usuario con contraseña encriptada y rol por defecto
exports.registro = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: 'Usuario y contraseña son obligatorios'
    });
  }

  try {
    const [usuarios] = await db.execute(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (usuarios.length > 0) {
      return res.status(409).json({
        mensaje: 'El usuario ya existe'
      });
    }

    // Encriptar contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Por seguridad, todo nuevo registro entra con rol 'operario'
    await db.execute(
      'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)',
      [usuario, passwordHash, 'operario']
    );

    return res.status(201).json({
      mensaje: 'Usuario registrado con éxito'
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
};

// Login de usuario con verificación de hash y generación de JWT
exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: 'Usuario y contraseña son obligatorios'
    });
  }

  try {
    const [usuarios] = await db.execute(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensaje: 'Error en la autenticación: credenciales inválidas'
      });
    }

    const user = usuarios[0];

    // Validar contraseña encriptada (y compatibilidad si hay un registro inicial sin hash)
    const esValida = user.password.startsWith('$2')
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!esValida) {
      return res.status(401).json({
        mensaje: 'Error en la autenticación: credenciales inválidas'
      });
    }

    // Generar Token JWT con expiración de 2 horas
    const token = jwt.sign(
      { id: user.id_usuario, usuario: user.usuario, rol: user.rol || 'operario' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      mensaje: 'Autenticación satisfactoria',
      token,
      usuario: {
        id: user.id_usuario,
        usuario: user.usuario,
        rol: user.rol || 'operario'
      }
    });

  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
};

// Obtener listado de usuarios sin exponer contraseñas (solo para administración)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id_usuario, usuario, rol FROM usuarios'
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
};

// Eliminar Usuario por ID (solo para administración)
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};