const mysql = require('mysql2');
require('dotenv').config();

// Creamos un Pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Máximo 10 conexiones simultáneas
    queueLimit: 0
});

// Exportamos el pool usando promesas para poder usar async/await
module.exports = pool.promise();