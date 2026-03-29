const db = require('../config/db');

exports.generarOutfit = async (req, res) => {
    const { userId } = req.params;

    try {
        // 1. Buscamos una prenda superior al azar
        const [sup] = await db.query(
            'SELECT * FROM prendas WHERE usuario_id = ? AND tipo = "superior" ORDER BY RAND() LIMIT 1', 
            [userId]
        );

        // 2. Buscamos una prenda inferior al azar
        const [inf] = await db.query(
            'SELECT * FROM prendas WHERE usuario_id = ? AND tipo = "inferior" ORDER BY RAND() LIMIT 1', 
            [userId]
        );

        // Validamos si hay ropa suficiente
        if (sup.length === 0 || inf.length === 0) {
            return res.status(404).json({ mensaje: "Falta ropa en el armario para combinar" });
        }

        // 3. Respuesta con el outfit armado
        res.json({
            mensaje: "Outfit sugerido con éxito",
            combinacion: {
                prenda_superior: sup[0],
                prenda_inferior: inf[0]
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};