const express = require("express");
const { Resend } = require("resend");

const app = express();
// const resend = new Resend("re_Yath6t2n_HcuP4DzE1WJf1UgUbiDPqF9F");

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

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
