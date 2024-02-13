import React from 'react'
import { FaCircleUser } from "react-icons/fa6";


function HeaderAdmin() {
    return (
        <header className="p-4 text-white bg-blue-500 border-b-2">
            <div className="container flex items-center justify-between mx-auto">
                <div className='flex items-center'>
                    <FaCircleUser size="3rem" className="mr-2" />
                    <h1 className="text-2xl font-bold">Alex Carrillo</h1>
                </div>
            </div>
        </header>

    )
}

export default HeaderAdmin