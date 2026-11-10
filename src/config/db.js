const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1014',
  database: process.env.DB_DATABASE || 'api_adso',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Conexión a MySQL configurada correctamente');
module.exports = pool;