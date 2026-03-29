const db = require('../config/db');

const addPrenda = async (req, res) => {
    // Recibimos los datos del cuerpo de la petición
    const { usuario_id, imagen_url, tipo, estilo, color_categoria } = req.body;

    try {
        // Ejecución de la consulta SQL
        const [result] = await db.query(
            'INSERT INTO prendas (usuario_id, imagen_url, tipo, estilo, color_categoria) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, imagen_url, tipo, estilo, color_categoria]
        );

        res.status(201).json({
            mensaje: "Prenda registrada exitosamente en el armario",
            prendaId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al registrar la prenda", 
            error: error.message 
        });
    }
};

// Obtener todas las prendas de un usuario específico
const getPrendasByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM prendas WHERE usuario_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addPrenda, getPrendasByUser };