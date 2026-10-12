// [BD] Importar conexión a MySQL
const db = require('../config/db');

// [CRUD] Obtener todas las órdenes de producción
const obtenerOrdenes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ordenes_produccion');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes de producción', detalle: error.message });
  }
};

// [CRUD] Obtener orden de producción por ID
const obtenerOrdenPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM ordenes_produccion WHERE id_orden = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Orden de producción no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener orden de producción', detalle: error.message });
  }
};

// [CRUD] Crear una nueva orden de producción
const crearOrden = async (req, res) => {
  const { numero_orden, fecha_inicio, estado, id_usuario, id_producto } = req.body;
  try {
    const [resultado] = await db.query(
      'INSERT INTO ordenes_produccion (numero_orden, fecha_inicio, estado, id_usuario, id_producto) VALUES (?, ?, ?, ?, ?)',
      [numero_orden, fecha_inicio, estado || 'En proceso', id_usuario, id_producto]
    );
    res.status(201).json({ mensaje: 'Orden de producción creada exitosamente', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear orden de producción', detalle: error.message });
  }
};

// [CRUD] Actualizar estado u orden por ID
const actualizarOrden = async (req, res) => {
  const { id } = req.params;
  const { numero_orden, fecha_inicio, estado, id_usuario, id_producto } = req.body;
  try {
    const [resultado] = await db.query(
      'UPDATE ordenes_produccion SET numero_orden = ?, fecha_inicio = ?, estado = ?, id_usuario = ?, id_producto = ? WHERE id_orden = ?',
      [numero_orden, fecha_inicio, estado, id_usuario, id_producto, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Orden de producción no encontrada' });
    }
    res.json({ mensaje: 'Orden de producción actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar orden de producción', detalle: error.message });
  }
};

// [CRUD] Eliminar orden por ID
const eliminarOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultado] = await db.query('DELETE FROM ordenes_produccion WHERE id_orden = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Orden de producción no encontrada' });
    }
    res.json({ mensaje: 'Orden de producción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar orden de producción', detalle: error.message });
  }
};

module.exports = {
  obtenerOrdenes,
  obtenerOrdenPorId,
  crearOrden,
  actualizarOrden,
  eliminarOrden
};