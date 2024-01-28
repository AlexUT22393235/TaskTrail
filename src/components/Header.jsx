import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

function Header() {
    return (
        <header className="border p-2 bg-sky-100">

            <div className="flex items-center justify-end">
                <p className="text-right font-semibold text-2xl p-3 ">Ricardo Beltran Cetina</p>
                <FaCircleUser size="3rem" className="mr-2" />
            </div>

        </header>
    )
}

export default Header