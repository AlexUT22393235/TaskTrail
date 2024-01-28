import { createBrowserRouter } from "react-router-dom";
import LoginMio from '../pages/LoginMio'
import Trabajos from "../pages/Trabajos";
import Detalles from "../pages/Detalles";

export const rutas = createBrowserRouter([
    {
        path: "/",
        element: <LoginMio />
    },
    {
        path: "/Trabajos",
        element: <Trabajos />
    },
    {
        path: "/Detalles",
        element: <Detalles />
    }

])