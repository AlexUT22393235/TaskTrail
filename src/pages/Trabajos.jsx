import React from 'react'
import { FaEye } from "react-icons/fa6";
import Header from '../components/Header';
import { Link } from 'react-router-dom';



function Trabajos() {
    return (
        <>
            <Header></Header>

            <h1 className="text-center text-4xl font-bold">Registro de trabajos</h1>
            <div className="p-2">
                <button className="w-[3%] bg-blue-950 p-4 text-white hover:bg-blue-700">+</button>

            </div>
            {/*tabla de trabajos */}
            <div class="container mx-auto p-3">
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border bg-sky-200">#</th>
                            <th class="py-2 px-4 border bg-sky-200">Trabajos</th>
                            <th class="py-2 px-4 border bg-sky-200">Descripcion</th>
                            <th class="py-2 px-4 border bg-sky-200">Precio</th>
                            <th class="py-2 px-4 border bg-sky-200">Detalles</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border">1</td>
                            <td class="py-2 px-4 border"></td>
                            <td class="py-2 px-4 border"></td>
                            <td class="py-2 px-4 border"></td>
                            <Link to="/Detalles">
                                <td class="py-2 px-4 border flex justify-center items-center"><FaEye size="2rem" /></td>
                            </Link>

                        </tr>
                        <tr>
                            <td class="py-2 px-4 border">2</td>
                            <td class="py-2 px-4 border"></td>
                            <td class="py-2 px-4 border"></td>
                            <td class="py-2 px-4 border"></td>
                            <td class="py-2 px-4 border flex justify-center items-center"><FaEye size="2rem" /></td>
                        </tr>

                    </tbody>
                </table>
            </div>



        </>
    )
}

export default Trabajos