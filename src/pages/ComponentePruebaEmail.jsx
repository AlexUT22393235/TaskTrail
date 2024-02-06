import React, { useState } from 'react';
import axios from 'axios';

const ComponentePruebaEmail = () => {
  const [destinatario, setDestinatario] = useState('');
  const [asunto, setAsunto] = useState('');
  const [cuerpo, setCuerpo] = useState('');

  const handleEnvioCorreo = async () => {
    try {
      // Realiza una solicitud POST a la ruta de tu backend que envía correos electrónicos
      const response = await axios.post('http://localhost:3001/email/enviar-correo', {
        destinatario,
        asunto,
        cuerpo,
      });

      console.log(response.data.mensaje);
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
    }
  };

  return (
    <div>
      <h1>Envío de Correo Electrónico</h1>
      <label>
        Destinatario:
        <input type="text" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} />
      </label>
      <br />
      <label>
        Asunto:
        <input type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
      </label>
      <br />
      <label>
        Cuerpo:
        <textarea value={cuerpo} onChange={(e) => setCuerpo(e.target.value)} />
      </label>
      <br />
      <button onClick={handleEnvioCorreo}>Enviar Correo</button>
    </div>
  );
};

export default ComponentePruebaEmail;
