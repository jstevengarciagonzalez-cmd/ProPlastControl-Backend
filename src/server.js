// [SERVER] Express y variables .env
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// [BD] Importar y verificar conexión MySQL
require('./config/db');

// [SERVER] Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// [MIDDLEWARE] Soporte para JSON en peticiones
app.use(express.json());

// [RUTAS] Importar rutas
const materiaPrimaRoutes = require('./routes/materiaPrimaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ordenProduccionRoutes = require('./routes/ordenProduccionRoutes');

// [RUTAS] Vincular los módulos a sus URLs base
app.use('/api/materia-prima', materiaPrimaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ordenes-produccion', ordenProduccionRoutes);

// [RUTA BASE] Endpoint de prueba del servidor
app.get('/', (req, res) => {
  res.json({ 
    message: 'API REST ProPlastControl Backend funcionando correctamente',
    status: 'OK'
  });
});

// [SERVER] Levantar puerto
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});