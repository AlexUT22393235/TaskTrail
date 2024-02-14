const connection = require("../database");

// Función para generar un código de verificación aleatorio de 4 dígitos
const generarCodigoVerificacion = () => Math.floor(1000 + Math.random() * 9000);

const insertarCodigoVerificacion = (req, res) => {
    const usuarioId = req.body.usuario_id; // Asume que el ID del usuario se envía en el cuerpo de la solicitud
    const codigo = generarCodigoVerificacion();

    // Insertar el nuevo código en la base de datos
    connection.query(
        'INSERT INTO codigo_verificacion (codigo, usuario_id) VALUES (?, ?)',
        [codigo, usuarioId],
        (error, results) => {
            if (error) {
                console.error('Error al insertar el código de verificación', error);
                return res.status(500).json({ error: 'Error al insertar el código de verificación' });
            }
            res.json({ message: 'Código de verificación insertado correctamente', codigo });
        }
    );
};

const obtenerCodigosDeVerificacion = (req, res) => {
    connection.query("SELECT * FROM codigo_verificacion", (error, results) => {
        if (error) {
            console.error("Error al obtener los códigos de verificación", error);
            res.status(500).json({
                error: "Error al obtener los códigos de verificación",
            });
        } else {
            res.json(results);
        }
    });
};

module.exports = {
    insertarCodigoVerificacion,
    obtenerCodigosDeVerificacion,
<<<<<<< HEAD
};
=======
};
>>>>>>> ac9ee06ab048cdb99f58799e51b013f1578587b6
