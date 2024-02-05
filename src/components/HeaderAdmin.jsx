import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaTools } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

function HeaderAdmin() {
    return (
        <header className="border p-2 bg-sky-100">
            

            <div className="flex items-center justify-end">
                <div className='flex'>
            <Link to="/AdminHerramientas">
                    <div className='flex'>
                        <FaTools size="3rem" className='mx-auto ' />
                    </div>
                </Link>
                <Link to="/Admin">
                    <FaUsers size="3rem" className='' />
                </Link>
            </div>
                
                <p className="text-right font-semibold text-2xl p-3 ">Ricardo Bltran Cetina</p>
                <FaCircleUser size="3rem" className="mr-2" />
            </div>

        </header>
    )
}

export default HeaderAdmin