const db = require('../config/db');

// Registro de usuario
exports.registro = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: 'usuario y contraseña, son obligatorios'
    });
  }

  try {
    // Verificar si el usuario ya existe
    const [usuarios] = await db.execute(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (usuarios.length > 0) {
      return res.status(409).json({
        mensaje: 'El usuario ya existe'
      });
    }

    // Insertar el nuevo usuario
    await db.execute(
      'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
      [usuario, password]
    );

    return res.status(201).json({
      mensaje: 'Usuario registrado con exito'
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: 'usuario y contraseña, son obligatorios'
    });
  }

  try {
    const [usuarios] = await db.execute(
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuario, password]
    );

    if (usuarios.length > 0) {
      return res.status(200).json({
        mensaje: 'Autenticacion satisfactoria'
      });
    } else {
      return res.status(401).json({
        mensaje: 'Error en la autenticacion'
      });
    }

  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
};