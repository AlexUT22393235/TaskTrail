import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

function Cronometro() {
    return (
        <>
        <Header></Header>
        <Link to="/Secciones">
            <IoArrowBack size="3rem"/>
            </Link>
        <h1 className="font-semibold text-4xl text-center">CRONOMETRO DE TRABAJO</h1>
        
            <p className="text-center p-10 text-2xl">Timepo Transcurrido</p>
            <p className="text-center p-10 text-4xl">00:00:00</p>
        <div className="flex justify-center items-center ">
            <button className="bg-blue-900 text-white p-3 hover:bg-blue-700 rounded-lg mr-10">Iniciar Trabajo</button>
            <button className="bg-blue-400 text-white p-3 hover:bg-blue-300 rounded-lg">Terminar Trabajo</button>
        </div>
        </>
    )
}

export default Cronometro