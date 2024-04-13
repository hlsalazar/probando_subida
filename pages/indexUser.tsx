import React, { useState } from 'react';
import { useRouter } from 'next/router';


function App() {

    var direccion_salida = "./login";
    var direccion_gestionFLores = "./gestionFlor";
    var direccion_almacen = "./almacen/gestionAlmacen";
    var direccion_proveedores = "./proveedores/gestionProveedores";
    var direccion_almacen = "./almacen/gestionAlmacen";

    const tipoUsuario = "usuario";

    const router = useRouter();

    const {valorUsername, envioRol} = router.query;
    const valorUsuario = decodeURIComponent(valorUsername);
    const valorRol = decodeURIComponent(envioRol);


    function SalirSesion() {
        router.push(direccion_salida);
    }
    function IrGestionFlores() {
        router.push(direccion_gestionFLores);
    }
    function IrAlmacen() {
        router.push({
            pathname: direccion_almacen,
            query: {tipoUsuario}
        });
    }
    function IrProveedores() {
        router.push(direccion_proveedores);
    }


    return (
        <div className='w-full h-screen bg-gradient-to-r from-lime-300 to-cyan-300'>
            <button className="ml-8 mt-6 p-4 relative inline-flex  text-2xl text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600"
                onClick={SalirSesion}>
                <span className="font-black">
                    SALIR
                </span>
            </button>
            <div className='relative h-50 w-full ' >
                <div className='lg:flex lg:justify-end lg:object-righT sm:justify-center sm:flex'>
                    <img src={'../assets/images/logo.png'} alt="" />
                </div>
            </div><br />
            {(valorRol == "Usuario") &&
             <a>Bienvenido {valorRol} {valorUsuario}</a>
            }
            {(valorRol == "Administrador") &&
             <a>NO Bienvenido {valorRol} {valorUsuario}</a>
            }
            <div className='mt-20'>
                <div className='flex flex-col-3 justify-center  items-center'>
                    <button type="button" className="text-6xl font-bold bg-green-400 hover:bg-gradient-to-bl  hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg p-8 text-center mr-4"
                        onClick={IrGestionFlores}
                    >GESTION FLOR</button>
                    <button type="button" className="text-6xl font-bold bg-pink-500 hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-pink-200 rounded-lg p-8 text-center mr-4"
                        onClick={IrAlmacen}
                    >ALMACEN</button>
                    <button type="button" className="text-6xl font-bold bg-blue-600 hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg p-8 text-center mr-4"
                        onClick={IrProveedores}
                    >PROVEEDORES</button>
                </div>
            </div>

        </div>

    );
}

export default App;
