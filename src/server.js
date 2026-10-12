// [SERVER] Express, variables .env y CORS
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// [BD] Importar y verificar conexión MySQL
require('./config/db');

// [SERVER] Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// [MIDDLEWARES] CORS, JSON y carpeta pública para el Frontend
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

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

// [SERVER] Levantar puerto
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});