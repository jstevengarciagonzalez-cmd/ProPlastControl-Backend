// [BD] Importar conexión a MySQL
const db = require('../config/db');

// [CRUD] Obtener todas las materias primas
const obtenerMateriasPrimas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM materia_prima');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materias primas', detalle: error.message });
  }
};

// [CRUD] Obtener una materia prima por ID
const obtenerMateriaPrimaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM materia_prima WHERE id_materia_prima = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Materia prima no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la materia prima', detalle: error.message });
  }
};

// [CRUD] Crear una nueva materia prima
const crearMateriaPrima = async (req, res) => {
  const { codigo, nombre_material, stock_kg, id_proveedor } = req.body;
  try {
    const [resultado] = await db.query(
      'INSERT INTO materia_prima (codigo, nombre_material, stock_kg, id_proveedor) VALUES (?, ?, ?, ?)',
      [codigo, nombre_material, stock_kg, id_proveedor]
    );
    res.status(201).json({ mensaje: 'Materia prima creada exitosamente', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear materia prima', detalle: error.message });
  }
};

// [CRUD] Actualizar materia prima por ID
const actualizarMateriaPrima = async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre_material, stock_kg, id_proveedor } = req.body;
  try {
    const [resultado] = await db.query(
      'UPDATE materia_prima SET codigo = ?, nombre_material = ?, stock_kg = ?, id_proveedor = ? WHERE id_materia_prima = ?',
      [codigo, nombre_material, stock_kg, id_proveedor, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Materia prima no encontrada' });
    }
    res.json({ mensaje: 'Materia prima actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar materia prima', detalle: error.message });
  }
};

// [CRUD] Eliminar materia prima por ID
const eliminarMateriaPrima = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultado] = await db.query('DELETE FROM materia_prima WHERE id_materia_prima = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Materia prima no encontrada' });
    }
    res.json({ mensaje: 'Materia prima eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar materia prima', detalle: error.message });
  }
};

// [EXPORT] Exportar controladores
module.exports = {
  obtenerMateriasPrimas,
  obtenerMateriaPrimaPorId,
  crearMateriaPrima,
  actualizarMateriaPrima,
  eliminarMateriaPrima
};