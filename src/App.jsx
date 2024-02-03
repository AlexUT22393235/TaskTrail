import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Detalles" element={<Detalles />} />
        <Route path="/Trabajos" element={<Trabajos />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App