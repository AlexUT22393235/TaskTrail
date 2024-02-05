<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import Trabajos1 from './pages/Trabajos1'
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';

>>>>>>> d0fcd2c30672a588463aa1ff524590fc6bc65789

function App() {

  return (
    <>
<<<<<<< HEAD
      <Login></Login>
      <Trabajos1></Trabajos1>
=======
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Detalles" element={<Detalles />} />
        <Route path="/Trabajos" element={<Trabajos />} />
      </Routes>
    </BrowserRouter>
>>>>>>> d0fcd2c30672a588463aa1ff524590fc6bc65789
    </>
  )
}

export default App