// index.js

const express = require("express");
const cors = require("cors");
const usuariosRouter = require("./router/usuariosRouter");
const materialesRouter = require("./router/materiales_Router");
const codigo_verificacionRouter = require("./router/codigo_verificacionRouter");
const loginRouter = require("./router/loginRouter");
const emailRouter = require("./router/emailRouter");
const materialTrabajoRouter = require("./router/materialTrabajoRouter");
const trabajoRouter = require("./router/trabajoRouter");

/* app va a tener todos los atributos y metodos de 
express */

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRouter);
app.use("/materiales", materialesRouter);
app.use("/login", loginRouter);
app.use('/email', emailRouter);

app.use("/codigo_verificacion", codigo_verificacionRouter);
app.use('/materialTrabajo', materialTrabajoRouter);
// Usa el enrutador de trabajo
app.use("/trabajo", trabajoRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Hola perro</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});
