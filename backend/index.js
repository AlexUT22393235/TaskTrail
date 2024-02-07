// !dependencias
const express = require("express");
const cors = require("cors");
const usuariosRouter = require("./router/usuariosRouter");
const cronometroControllers = require("./router/cronometroRouter");

/* app va a tener todos los atributos y metodos de 
express */

const app = express();

app.use(cors());

app.use(express.json());


app.use("/usuarios", usuariosRouter);

app.use("/cronometro", cronometroControllers)



app.get("/", (req, res) => {
  res.send(`<h1>Hola perro</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});