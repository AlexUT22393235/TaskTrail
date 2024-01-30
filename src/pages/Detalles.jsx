import React from 'react'
import Header from '../components/Header'
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';


function Detalles() {
    return (
        <>
            <Header></Header>

            <Link to="/Trabajos">
            <IoArrowBack size="3rem"/>
            </Link>
            
            <h1 className="font-semibold text-center text-4xl p-4">Detalles</h1>
            
            {/*Texto de la izquierda*/}
            <div className="flex-container">
    <div className="flex-shrink-0 text-left p-4">
        <p className="font-semibold text-3xl">Tipo de trabajo:</p>
    </div>

    <div className="flex-shrink-0 text-left p-4">
        <p className="font-semibold text-3xl">Materiales:</p>
        <ul className="p-5">
            <li className="text-2xl">Llantas: $4800</li>
            <li className="text-2xl">Llantas: $4800</li>
            <li className="text-2xl">Llantas: $4800</li>
            
        </ul>
    </div>

    <div className="flex-grow"></div>
{/*Texto de la derecha */}
    <div className="flex-shrink-0 text-right p-4">
        <p className="font-semibold text-3xl">Horas de trabajo: 7</p>
        <p className="font-semibold text-3xl">Total por horas de trabajo: $2000</p>
    </div>
</div>
{/*Texto de hasta abajo*/}
<div className="absolute bottom-0 p-10 left-[80%]">
<p className="text-4xl font-bold">TOTAL: 500$</p>
</div>

    <div className="p-5">
    <Link to="/Secciones">
            <button className="bg-blue-500 p-2 border rounded-lg hover:bg-blue-300 text-white w-[10%]">Ver Secciones</button>        
        </Link>
    </div>
        
        
        </>
    )
}

export default Detalles