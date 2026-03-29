const evaluarOutfit = (req, res) => {
    const { prenda_superior, prenda_inferior, evento } = req.body;

    let puntaje = 10;
    let recomendaciones = [];

    // Ejemplo de lógica de "IA" por reglas de negocio
    if (evento === 'formal' || evento === 'entrevista') {
        if (prenda_superior.estilo !== 'formal') {
            puntaje -= 3;
            recomendaciones.push("Para un evento formal, se recomienda una prenda superior más elegante.");
        }
        if (prenda_inferior.color_categoria === 'llamativo') {
            puntaje -= 2;
            recomendaciones.push("Los colores llamativos restan seriedad en contextos formales.");
        }
    }

    if (evento === 'fiesta') {
        if (prenda_superior.color_categoria === 'neutro' && prenda_inferior.color_categoria === 'neutro') {
            puntaje -= 1;
            recomendaciones.push("El outfit es un poco apagado para una fiesta, intenta un color más llamativo.");
        }
    }

    // Aseguramos que el puntaje no sea menor a 1
    puntaje = Math.max(1, puntaje);

    res.json({
        puntaje: `${puntaje}/10`,
        evaluacion: puntaje >= 7 ? "Adecuado" : "No recomendado",
        recomendaciones: recomendaciones.length > 0 ? recomendaciones : ["¡Excelente combinación para el evento!"]
    });
};

module.exports = { evaluarOutfit };