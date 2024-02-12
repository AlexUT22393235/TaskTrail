import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Trabajos from "../pages/Trabajos";
import Detalles from "../pages/Detalles";
import Secciones from "../pages/Secciones";
import GeneradoCodigo from "../Functions/GeneradoCodigo";
import Admin from "../pages/Admin";
import CodigoVerificacion from "../pages/CodigoVerificacion";
import ComponentePrueba from "../pages/ComponentePrueba";
import ComponentePruebaEmail from "../pages/ComponentePruebaEmail";
import AdminGeneral from '../pages/AdminGeneral'
import { TrabajoPendienteProvider } from '../context/TrabajoPendienteContexto';


export const rutas = createBrowserRouter([
    {
        
        path: "/",
        element:(<TrabajoPendienteProvider>
            <Login/>
        </TrabajoPendienteProvider>) 
    },
    {
        path: "/Admin",
        element: <Admin />
    },
    {
        
        path: '/Trabajos',
        element: (
            <TrabajoPendienteProvider>
                <Trabajos />
            </TrabajoPendienteProvider>
        )
    },
    {
        path: "/Detalles",
        element: <Detalles/>
    },
    {
        path: "/Secciones",
        element: (<TrabajoPendienteProvider>
            <Secciones />
        </TrabajoPendienteProvider>)
    },
    {
        path: "/Codigo",
        element:<GeneradoCodigo/>
    },
    
    
   
    {
        path: "/CodigoVerificacion",
        element: <CodigoVerificacion />
    },
    {
        path: "/ComponentePrueba",
        element: <ComponentePrueba />
    },
    {
        path: "/ComponentePruebaEmail",
        element: <ComponentePruebaEmail />
    },
    {
        path: "/AdminGeneral",
        element: <AdminGeneral />
    }

])