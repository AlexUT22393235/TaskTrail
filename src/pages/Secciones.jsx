import React from 'react';
import Header from '../components/Header';
import { TfiAlarmClock } from 'react-icons/tfi';
import { BsWrench } from 'react-icons/bs';
import { Link } from 'react-router-dom';


function Secciones() {
    return (
        <>
            <Header />
            <h1 className="text-center text-4xl font-bold">Secciones</h1>
            <div className="flex items-center justify-center p-5">
                <div className="bg-blue-300 p-10 w-[20%] rounded-lg flex flex-col items-center justify-center">
                    <TfiAlarmClock size="10rem" />
                    <p className="text-center mt-2 font-bold text-2xl">Contador de Horas</p>
                </div>

                <div className="bg-blue-500 p-10 w-[20%] rounded-lg flex flex-col items-center justify-center ml-4">
                    <BsWrench size="10rem" />
                    <p className="text-center mt-2 font-bold text-2xl">Contador de horas</p>
                </div>
            </div>
        </>
    );
}

export default Secciones;
