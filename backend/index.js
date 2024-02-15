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
const tipoTrabajoRouter = require("./router/tipoTrabajoRouter");
const cronometroControllers = require("./router/cronometroRouter");
const tarifaRouter = require("./router/tarifa_Router")
const materialPorTrabajoRouter = require("./router/materialPorTrabajoRouter");
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
app.use("/cronometro", cronometroControllers)
app.use("/tarifa", tarifaRouter)
app.use("/materialPorTrabajo", materialPorTrabajoRouter)



app.get("/", (req, res) => {
  res.send(`<h1>Hola perro</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});
