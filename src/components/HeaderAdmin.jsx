import React from 'react'
import { FaCircleUser } from "react-icons/fa6";


function HeaderAdmin() {
    return (
        <header className="border p-2 bg-sky-100">
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex'>
                     <h1 className="text-2xl font-bold mr-5">Alex Carrillo</h1>
                <FaCircleUser size="3rem" className="mr-2" />
                </div>
           
                <nav>
          <ul className="flex space-x-4">
            
            <li><a href="#" className="hover:text-gray-300">Acerca de</a></li>
            
            <li><a href="#" className="hover:text-gray-300">Ayuda</a></li>
          </ul>
        </nav>
            </div>

        </header>
    )
}

export default HeaderAdmin