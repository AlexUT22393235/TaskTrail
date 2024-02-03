import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Trabajos from "../pages/Trabajos";
import Detalles from "../pages/Detalles";
import Secciones from "../pages/Secciones";
import ListaMateriales from "../pages/ListaMaterial";
import Cronometro from "../pages/Cronometro";

export const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/Trabajos",
        element: <Trabajos />
    },
    {
        path: "/Detalles",
        element: <Detalles/>
    },
    {
        path: "/Secciones",
        element: <Secciones />
    },
    {
        path: "/ListaMateriales",
        element: <ListaMateriales />
    },
    {
        path: "/Cronometro",
        element: <Cronometro />
    }

])