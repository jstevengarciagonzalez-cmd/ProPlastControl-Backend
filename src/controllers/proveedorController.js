// [BD] Importar conexión a MySQL
const db = require('../config/db');

// [CRUD] Obtener todos los proveedores
const obtenerProveedores = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM proveedores');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores', detalle: error.message });
  }
};

// [CRUD] Obtener un proveedor por ID
const obtenerProveedorPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proveedor', detalle: error.message });
  }
};

// [CRUD] Crear un nuevo proveedor
const crearProveedor = async (req, res) => {
  const { nit, razon_social, telefono, correo } = req.body;
  try {
    const [resultado] = await db.query(
      'INSERT INTO proveedores (nit, razon_social, telefono, correo) VALUES (?, ?, ?, ?)',
      [nit, razon_social, telefono, correo]
    );
    res.status(201).json({ mensaje: 'Proveedor creado exitosamente', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear proveedor', detalle: error.message });
  }
};

// [CRUD] Actualizar proveedor por ID
const actualizarProveedor = async (req, res) => {
  const { id } = req.params;
  const { nit, razon_social, telefono, correo } = req.body;
  try {
    const [resultado] = await db.query(
      'UPDATE proveedores SET nit = ?, razon_social = ?, telefono = ?, correo = ? WHERE id_proveedor = ?',
      [nit, razon_social, telefono, correo, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json({ mensaje: 'Proveedor actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar proveedor', detalle: error.message });
  }
};

// [CRUD] Eliminar proveedor por ID
const eliminarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultado] = await db.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proveedor', detalle: error.message });
  }
};

// [EXPORT] Exportar controladores
module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};