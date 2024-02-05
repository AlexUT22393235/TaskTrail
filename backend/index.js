// !dependencias
const express = require("express");
const cors = require("cors");
const usuariosRouter = require("./router/usuariosRouter");
const bodyParser = require('body-parser');
// const { Resend } = require("resend");

/* app va a tener todos los atributos y metodos de 
express */

const app = express();

// const resend = new Resend("re_Yath6t2n_HcuP4DzE1WJf1UgUbiDPqF9F");

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

// app.get("/codigo", async (req, res) => {
//   const { data, error } = await resend.emails.send({
//     from: "Acme <onboarding@resend.dev>",
//     to: ["tony13.aekc@gmail.com"],
//     subject: "codigo de verificacion",
//     html: "<strong>4743</strong>",
//   });

//   if (error) {
//     return res.status(400).json({ error });
//   }

//   res.status(200).json({ data });
// });


app.use("/usuarios", usuariosRouter);



app.get("/", (req, res) => {
  res.send(`<h1>Hola perro</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});