const db = require('../config/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Encriptación de contraseña (Hash)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Inserción en la base de datos
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );

        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            usuarioId: result.insertId
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser };