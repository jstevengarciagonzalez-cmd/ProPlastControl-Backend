// [BD] Importar conexión a MySQL
const db = require('../config/db');

// [CRUD] Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', detalle: error.message });
  }
};

// [CRUD] Obtener producto por ID
const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto', detalle: error.message });
  }
};

// [CRUD] Crear un nuevo producto
const crearProducto = async (req, res) => {
  const { codigo, descripcion, precio_unitario, stock_unidades } = req.body;
  try {
    const [resultado] = await db.query(
      'INSERT INTO productos (codigo, descripcion, precio_unitario, stock_unidades) VALUES (?, ?, ?, ?)',
      [codigo, descripcion, precio_unitario, stock_unidades]
    );
    res.status(201).json({ mensaje: 'Producto creado exitosamente', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto', detalle: error.message });
  }
};

// [CRUD] Actualizar producto por ID
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { codigo, descripcion, precio_unitario, stock_unidades } = req.body;
  try {
    const [resultado] = await db.query(
      'UPDATE productos SET codigo = ?, descripcion = ?, precio_unitario = ?, stock_unidades = ? WHERE id_producto = ?',
      [codigo, descripcion, precio_unitario, stock_unidades, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto', detalle: error.message });
  }
};

// [CRUD] Eliminar producto por ID
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultado] = await db.query('DELETE FROM productos WHERE id_producto = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', detalle: error.message });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};