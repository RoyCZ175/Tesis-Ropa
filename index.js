const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Importamos la conexión desde config
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar salud del servidor y BD
app.get('/test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT "Conexión Exitosa " AS estado');
        res.json({
            mensaje: "Servidor escuchando y Base de Datos conectada",
            prueba: rows[0].estado
        });
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error de conexión a la base de datos", 
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
const iaRoutes = require('./routes/iaRoutes');

const userRoutes = require('./routes/userRoutes');
const prendaRoutes = require('./routes/prendaRoutes');
const outfitRoutes = require('./routes/outfitRoutes');

app.use('/api/ia', iaRoutes);

app.use('/api/users', userRoutes);
app.use('/api/prendas', prendaRoutes);
app.use('/api/outfits', outfitRoutes);

app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
    console.log(` Probando conexión a la base de datos...`);
});