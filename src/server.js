const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Importar rutas de tu proyecto ProPlastControl
const materiaPrimaRoutes = require('./routes/materiaPrimaRoutes');
const ordenProduccionRoutes = require('./routes/ordenProduccionRoutes');
const productoRoutes = require('./routes/productoRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.json({ mensaje: 'API ProPlastControl funcionando correctamente' });
});

// Registrar rutas en la API
app.use('/api', authRoutes);
app.use('/api/materia-prima', materiaPrimaRoutes);
app.use('/api/ordenes', ordenProduccionRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);

// Puerto desde variables de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});