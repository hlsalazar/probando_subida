import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import BarraFlotante from '../../components/ModalHeadBar';


function App() {

    var direccion_salida = "../login";
    var direccion_agregarFactura = "./gestionFacturacion";
    var direccion_modificarFactura = "./modificacionFactura";
    var direccion_eliminarFactura = "./eliminacionFactura";

    const router = useRouter();
    function SalirSesion() {
        router.push(direccion_salida);
    }
    function IrAgregarFactura() {
        router.push(direccion_agregarFactura);
    }
    function IrModificarFactura() {
        router.push(direccion_modificarFactura);
    }
    function IrEliminarFactura() {
        router.push(direccion_eliminarFactura);
    }

    useEffect(() => {
        document.title = "Facturación";
    }, []);

    return (
        <Fragment>
            <BarraFlotante></BarraFlotante>
        <div className='w-full h-screen bg-gradient-to-r from-lime-300 to-cyan-300'>>
            <button className="ml-8 mt-6 p-4 relative inline-flex  text-2xl text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600"
                onClick={router.back}>
                <span className="font-black">
                    REGRESAR
                </span>
            </button>
            <div className='relative h-50 w-full ' >
                <div className='lg:flex lg:justify-end lg:object-righT sm:justify-center sm:flex'>
                    <img src={'../assets/images/logo.png'} alt="" />
                </div>
            </div><br />
            <div className='mt-20'>
                <div className='flex flex-col lg:flex-row justify-center  items-center'>
                    <button type="button" className="flex items-center p-8 text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrAgregarFactura}
                    >AGREGAR FACTURA</button>
                    <button type="button" className="flex items-center p-8 text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrModificarFactura}
                    >MODIFICAR FACTURA</button>
                    <button type="button" className="flex items-center p-8 text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrEliminarFactura}
                    >ELIMINAR FACTURA</button>
                </div>
            </div>

        </div>
        </Fragment>
    );
}

export default App;
