import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Trabajos from "../pages/Trabajos";
import Detalles from "../pages/Detalles";
import Secciones from "../pages/Secciones";

export const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/Trabajos",
        element: <Trabajos />
    },
    {
        path: "/Detalles",
        element: <Detalles />
    },
    {
        path: "/Secciones",
        element: <Secciones />
    }

])