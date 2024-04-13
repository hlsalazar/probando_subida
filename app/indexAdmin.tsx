import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function App() {

    var direccion_salida = "./login";
    var direccion_gestionFLores = "./gestionFlor";
    var direccion_almacen = "./almacen/gestionAlmacen";
    var direccion_personal = "./personal/gestionPersonal";
    var direccion_proveedores = "./proveedores/gestionProveedores";
    var direccion_reportes = "./reportes/reportesAdmin";
    var direccion_facturacion = "./facturacion/indexFacturacion";
    var direccion_comprador = "./comprador/gestionComprador";
    var direccion_valueCargo = "./cargo/gestionValueCargo";
    var direccion_variedad = "./variedad/gestionVariedad";

    const router = useRouter();

    const { valorUsername, envioRol } = router.query;
    const valorUsuario = localStorage.getItem('valorGlobalUsuario');
    const valorRol = localStorage.getItem('valorGlobal');

    function SalirSesion() {
        router.push(direccion_salida);
    }
    function IrGestionFlores() {
        router.push(direccion_gestionFLores);
    }
    function IrAlmacen() {
        router.push(direccion_almacen);
    }
    function IrPersonal() {
        router.push(direccion_personal);
    }
    function IrProveedores() {
        router.push(direccion_proveedores);
    }
    function IrReportes() {
        router.push(direccion_reportes);
    }
    function IrFacturacion() {
        router.push(direccion_facturacion);
    }
    function IrComprador() {
        router.push(direccion_comprador);
    }
    function IrValueCargo() {
        router.push(direccion_valueCargo);
    }
    function IrGestionVariedad(){
        router.push(direccion_variedad);
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            padding: '40px',
        },
        bienvenidoTexto: {
            fontSize: '24px',
            color: 'black',
        },
    };

    useEffect(() => {
        document.title = "GP-Flowers"
    }, [])


    return (

        <div className='w-full min-h-screen  bg-gradient-to-r from-lime-300 to-cyan-300 p-3'>
            <button className="ml-8 mt-6 p-4 relative inline-flex  text-xl text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600"
                onClick={SalirSesion}>
                <span className="font-black">
                    SALIR
                </span>
            </button>
            <div className='relative h-50 w-full ' >
                <div className='p-12 flex justify-center lg:flex lg:justify-end lg:object-right sm:justify-center sm:flex'>
                    <img className='w-1/2 sm:w-1/4' src={'../assets/images/logo.png'} alt="" />
                </div>
            </div>

            <div style={styles.container}>
                {valorRol === 'Usuario' && (
                    <div className='flex flex-col items-center'>
                        <p style={styles.bienvenidoTexto}>
                            BIENVENIDO! - {valorRol} {valorUsuario}
                        </p>
                        <a href="#" class="border-black">
                            <img className='' src={'../assets/images/icono_user.png'} alt="" />
                        </a>
                    </div>
                )}
                {valorRol === 'Administrador' && (
                    <div className='flex flex-col items-center'>
                        <p style={styles.bienvenidoTexto}>
                            BIENVENIDO! - {valorRol} {valorUsuario}
                        </p>
                        <a href="#" class="border-black">
                            <img className='' src={'../assets/images/icono_admin.png'} alt="" />
                        </a>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-9 ">

                <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 rounded-lg focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrGestionFlores}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
                        </svg>
                        GESTION FLOR</button>
                </div>
                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrAlmacen}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path>
                        </svg>
                        ALMACEN</button>
                </div>}
                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrGestionVariedad}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
                        </svg>
                        VARIEDAD</button>
                </div>}
                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrPersonal}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                        </svg>
                        PERSONAL</button>
                </div>}
                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrProveedores}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                        </svg>
                        PROVEEDORES</button>
                </div>}

                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrFacturacion}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"></path>
                        </svg>
                        FACTURACION</button>
                </div>}
                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrComprador}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                        </svg>
                        COMPRADORES</button>
                </div>}
                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrValueCargo}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        VALUE CARGO</button>
                </div>}
                {(valorRol == "Administrador") && <div>
                    <button type="button" className="flex flex-col items-center text-calc(4vw + 16px) font-bold bg-white hover:bg-gradient-to-bl hover:ring-8 focus:ring-4 focus:ring-green-200 rounded-lg text-center mr-2 mb-2"
                        onClick={IrReportes}>
                        <svg width="50%" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        REPORTES</button>
                </div>}
            </div>

        </div>
    );
}

export default App;
