const connection = require("../database");

const obtenerTipoTrabajo = (req, res) => {
    connection.query("SELECT * FROM tipo_trabajo", (error, results) => {
        if (error) {
            console.error("Error al obtener tipo_trabajo", error);
            res.status(500).json({
                error: "Error al obtener tipo_trabajo",
            });
        } else {
            res.json(results);
        }
        const tipoTrabajo = results[0] || {};

    
        console.log('Tipo de trabajo:', tipoTrabajo);
          res.json({
            message: 'Datos obtenidos satisfactoriamente',
            tipoTrabajo: {
              id_tipo_trabajo: tipoTrabajo.id_tipo_trabajo,
              nombre_tipo_trabajo: tipoTrabajo.nombre_tipo_trabajo,
              precio_variable: tipoTrabajo.precio_variable,
            },
            id_tipo_trabajo: tipoTrabajo.id_tipo_trabajo,
            nombre_tipo_trabajo: tipoTrabajo.nombre_tipo_trabajo
          });
      

    });

};

  // Asegúrate de que results[0] sea un objeto antes de desestructurarlo


module.exports = {
    obtenerTipoTrabajo
}