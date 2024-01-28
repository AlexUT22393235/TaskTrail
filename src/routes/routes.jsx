import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Trabajos from "../pages/Trabajos";
import Detalles from "../pages/Detalles";

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
    }

])