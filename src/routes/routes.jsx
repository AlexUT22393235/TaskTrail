import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Trabajos from "../pages/Trabajos";
import Detalles from "../pages/Detalles";
import Secciones from "../pages/Secciones";
import ListaMateriales from "../pages/ListaMaterial";
import Cronometro from "../pages/Cronometro";
import GeneradoCodigo from "../Functions/GeneradoCodigo";
import Admin from "../pages/Admin";
import AdminHerramientas from "../pages/AdminHerramientas";
import Trabajos1 from "../pages/Trabajos1";
import Token from "../pages/Token";
import ComponentePrueba from "../pages/ComponentePrueba";

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
    },
    {
        path: "/Codigo",
        element:<GeneradoCodigo/>
    },{
        path: "/Admin",
        element: <Admin />
    },{
        path: "/AdminHerramientas",
        element: <AdminHerramientas />
    },
    {
        path: "/Trabajos1",
        element: <Trabajos1></Trabajos1>
    },
    {
        path: "/Token",
        element: <Token />
    },
    {
        path: "/ComponentePrueba",
        element: <ComponentePrueba />
    }

])