import React from 'react';
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Detalles() {
    return (
        <>
        <Header />
        <div className="container mx-auto p-8">
            
            
            
            
            <div className="text-center">
                <h1 className="font-semibold text-4xl mb-4">Detalles</h1>
            </div>

            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="font-semibold text-2xl">Tipo de trabajo: Reparación</p>

                    <p className="font-semibold text-2xl mt-4">Materiales:</p>
                    <ul className="list-disc ml-8">
                        <li className="text-xl">Llantas: $4800</li>
                        <li className="text-xl">Aceite: $2000</li>
                        {/* Agrega más materiales si es necesario */}
                    </ul>
                </div>

                <div className="text-right">
                    <p className="font-semibold text-2xl">Horas de trabajo: 7</p>
                    <p className="font-semibold text-2xl mt-4">Total por horas de trabajo: $2000</p>
                </div>
            </div>

            <div  className="absolute bottom-0 p-10 left-[80%]">
                <p className="text-4xl font-bold">TOTAL: $500</p>
            </div>

            <div className="absolute bottom-0 p-10 right-[85%]">
                <Link to="/Secciones">
                    <button className="bg-blue-500 p-3 rounded-lg hover:bg-blue-300 text-white ">Ver Secciones</button>
                </Link>
            </div>
        </div>
    </>
    );
}

export default Detalles;
