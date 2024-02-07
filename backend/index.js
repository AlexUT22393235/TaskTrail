// index.js

const express = require("express");
const cors = require("cors");
const usuariosRouter = require("./router/usuariosRouter");
const materialesRouter = require("./router/materiales_Router");
const codigo_verificacionRouter = require("./router/codigo_verificacionRouter");
const loginRouter = require("./router/loginRouter");
const emailRouter = require("./router/emailRouter");
const trabajoRouter = require("./router/trabajosRouter"); // Importa el enrutador de trabajo
const materialTrabajo = require("./router/materialTrabajoRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRouter);
app.use("/materiales", materialesRouter);
app.use("/login", loginRouter);
app.use('/email', emailRouter);
app.use("/codigo_verificacion", codigo_verificacionRouter);
app.use('/materialTrabajo', materialTrabajo);
// Usa el enrutador de trabajo
app.use("/trabajo", trabajoRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Hola perro</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});
