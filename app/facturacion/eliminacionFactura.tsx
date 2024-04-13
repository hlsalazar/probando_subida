import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import BarraFlotante from '../../components/ModalHeadBar';




function App() {

    const [seleccionComprador, setSeleccionComprador] = useState(true);
    const [seleccionAño, setSeleccionAño] = useState(false);
    const [seleccionMes, setSeleccionMes] = useState(false);
    const [seleccionDia, setSeleccionDia] = useState(false);
    const [estadoSeleccion, setEstadoSeleccion] = useState(true);


    //estas constantes sirven para guardar los objetos de las consultas 
    //de manera que se puedan usar en la pantalla de modificar
    const [comprador, setComprador] = useState([]);
    const [fecha, setFecha] = useState([]);
    const [hora, setHora] = useState([]);

    const [facturasComprador, setFacturasComprador] = useState([]);
    const [compradorAnios, setCompradorAnios] = useState([]);
    const [compradorMeses, setCompradorMeses] = useState([]);
    const [compradorDias, setCompradorDias] = useState([]);
    const [compradorHoras, setCompradorHoras] = useState([]);

    //estas variables sirven para enviar los datos de consulta
    //como query
    const [seleccionConsultaComprador, setSeleccionConsultaComprador] = useState("");
    const [seleccionConsultaAnio, setSeleccionConsultaAnio] = useState("");
    const [seleccionConsultaMes, setSeleccionConsultaMes] = useState("");
    const [seleccionConsultaDia, setSeleccionConsultaDia] = useState("");
    const [seleccionConsultaHora, setSeleccionConsultaHora] = useState("");

    //variables para juntar todas las variables de consulta 
    //y realizar una consulta donde muestre una factura especifica
    const [fechaFactura, setFechaFactura] = useState("");
    const [horaFactura, setHoraFactura] = useState("");

    //variable para busqueda de factura
    const [compradorBusquedaFactura, setCompradorBusquedaFactura] = useState("");
    const [fechaBusquedaFactura, setFechaBusquedaFactura] = useState("");
    const [horaBusquedaFactura, setHoraBusquedaFactura] = useState("");


    //direcciones
    var direccion_salida = "../login";
    var direccion_gestionModificacionFactura = "./gestionEliminarFactura";

    //variables para guardar datos para enviar a gestionModificacionFactura
    const [fechaEnvioConsulta, setFechaEnvioConsulta] = useState("");
    const [HoraEnvioConsulta, setHoraEnvioConsulta] = useState("");

    //valor para guardar el valor de item

    const [valorFechaHoraGuardar, setValorFechaHoraGuardar] = useState(null);

    const router = useRouter();
    function SalirSesion() {
        router.push(direccion_salida);
    }

    function IrModificacionFactura(){
        router.push({
            pathname: direccion_gestionModificacionFactura,
            query: {compradorBusquedaFactura, fechaBusquedaFactura, horaBusquedaFactura}
        }
        )    
    }

    function asignarEstadoSeleccion(estado) {
        if(estado == true) setEstadoSeleccion(true)
        else if (estado == false) setEstadoSeleccion(false);
    }

    //conseguir data sobre comprador 
    async function getComprador(){
        const postData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comprador_en_factura`,
        postData);
        const response = await res.json();
        setComprador(response.comprador);
      }

          //conseguir data sobre comprador 
    async function getFecha(){

        const queryParams = new URLSearchParams({
            nombre_comp : compradorBusquedaFactura,
          }
          );

        const postData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/fecha_en_factura?${queryParams.toString()}`,
        postData);
        const response = await res.json();
        setFecha(response.fecha);
      }

          //conseguir data sobre comprador 
    async function getHora(event){

        const queryParams = new URLSearchParams({
            fecha_comp: event.target.value,
            nombre_comp: compradorBusquedaFactura
          }
          );


        const postData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/hora_en_factura?${queryParams.toString()}`,
        postData);
        const response = await res.json();
        setHora(response.hora);
      }

      const opcionesComprador = comprador.map((vard) => ({
        value: vard.nombre_comp,
        label: vard.nombre_comp
      }));

    //conseguir data sobre facturas, se envia nombre de comprador 
    async function getFacturasComprador(){
        const queryParams = new URLSearchParams({
            nombre_comp : compradorBusquedaFactura,
          }
          );
          
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/fechas_facturas_registradas?${queryParams.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const response = await res.json();
          setFacturasComprador(response.facturas_comprador);
      }


    //conseguir data de años
    async function getAniosComprador(){

        const queryParams = new URLSearchParams({
          compradorNombre : seleccionConsultaComprador,
        }
        );

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/anios_comprador?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await res.json();
        setCompradorAnios(response.aniosComprador);
      }

      const opcionesAnios = compradorAnios.map((vard) => ({
        value: vard.anios_comp,
        label: vard.anios_comp
      }));

    const asignarBuscarComprador = event => {
        setCompradorBusquedaFactura(event.target.value);
    }
    const asignarBuscarFecha = event => {
        setFechaBusquedaFactura(event.target.value);
    }
    const asignarBuscarHora = event => {
        setHoraBusquedaFactura(event.target.value);
    }

    const asignarFechaHoraComprador = (item) => {
        setFechaEnvioConsulta(item.fecha_calFacturacion);
        setHoraEnvioConsulta(item.hora_calFacturacion);
    }


      useEffect(() => {
        document.title = "Eliminar Factura";
        getComprador();
        getFecha();
      },[]);

      useEffect(() => {

        if(valorFechaHoraGuardar){
            asignarFechaHoraComprador(valorFechaHoraGuardar);
        }
      },[valorFechaHoraGuardar]);



    return (
        <Fragment>
        <BarraFlotante></BarraFlotante>

        <div className='w-full h-full bg-gradient-to-r from-lime-300 to-cyan-300'>

            <button className="mt-6 mx-8 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                onClick={router.back}>
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-500 rounded-md group-hover:bg-opacity-0 font-black">
                    REGRESAR
                </span>
            </button>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-500 rounded-md group-hover:bg-opacity-0 font-black">
                        Eliminar Factura
            </span>
                <br />
                <br></br>
            <div className='flex bg-white text-4xl place-content-center content-center flex-wrap h-40'>
                eliminación
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" stroke-width="1.5" stroke="red" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            {
                seleccionComprador 
                &&
                <div className='w-6/7 p-8 flex flex-col lg:flex-row bg-white'>
                <label for="years" class="block m-12 text-4xl font-medium text-gray-900 dark:text-white">Seleccione el comprador</label>
                <select onChange={(event) => {asignarEstadoSeleccion(false); asignarBuscarComprador(event)}} id="years" size="10" class="bg-gray-50 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-red dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {comprador.map((item, index) => (
                        <option onClickCapture={(event) => {asignarEstadoSeleccion(false); asignarBuscarComprador(event)}} key={index} value={item.comprador_calFacturacion} className='text-2xl'>
                            {item.comprador_calFacturacion}
                        </option>
                        ))}
                </select>
                
                <div className='flex flex-col'>
                    <button disabled={estadoSeleccion} onClick={() => { setSeleccionAño(true); setSeleccionComprador(false); asignarEstadoSeleccion(true); getFacturasComprador(); getFecha() }}  class="rounded flex flex-row m-6 text-2xl font-medium text-gray-900 h-20 w-56 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="flex items-center h-20 transition-all ease-in duration-75 dark:bg-gray-900 w-1/3 group-hover:bg-opacity-0">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </span>
                        <div className='flex items-center h-20'>
                        <span class="transition-all ease-in duration-75 dark:bg-gray-900 w-2/3 group-hover:bg-opacity-0">
                            CONTINUAR
                        </span>
                        </div>
                    </button>
                </div>
                
            </div>

            }

            {
                seleccionAño 
                &&
                <div className='w-6/7 flex flex-col lg:flex-row bg-white p-8'>
                <label for="years" class="block m-12 text-4xl font-medium text-gray-900 dark:text-white">Seleccione fecha y hora</label>
                <select onChange={(event) => {asignarBuscarFecha(event);getHora(event)}} id="years" size="5" class="bg-gray-50 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-red dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {fecha.map((item, index) => (
                        <option onClickCapture={(event) => {asignarBuscarFecha(event);getHora(event)}} key={index} value={item.fecha_calFacturacion} className='text-2xl'>
                            {item.fecha_calFacturacion}
                        </option>
                        ))}
                </select>
                <select onChange={(event) => {asignarEstadoSeleccion(false); asignarBuscarHora(event); }} id="years" size="5" class="bg-gray-50 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-red dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {hora.map((item, index) => (
                        <option onClickCapture={(event) => {asignarEstadoSeleccion(false); asignarBuscarHora(event); }} key={index} value={item.hora_calFacturacion} className='text-2xl'>
                            {item.hora_calFacturacion}
                        </option>
                        ))}
                </select>
                <div className='flex flex-col'>
                    <button disabled={estadoSeleccion} onClick={() => {setSeleccionAño(false); asignarEstadoSeleccion(true); IrModificacionFactura()}}  class="rounded flex flex-row m-6 text-2xl font-medium text-gray-900 h-20 w-56 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="flex items-center h-20 transition-all ease-in duration-75 dark:bg-gray-900 w-1/3 group-hover:bg-opacity-0">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </span>
                        <div className='flex items-center h-20'>
                        <span class="transition-all ease-in duration-75 dark:bg-gray-900 w-2/3 group-hover:bg-opacity-0">
                            CONTINUAR
                        </span>
                        </div>
                    </button> 
                    <button onClick={() => {setSeleccionAño(false); setSeleccionComprador(true); asignarEstadoSeleccion(true)}}  class="rounded flex flex-row m-6 text-2xl font-medium text-gray-900 h-20 w-56 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="flex items-center h-20 transition-all ease-in duration-75 dark:bg-gray-900 w-1/3 group-hover:bg-opacity-0">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </span>
                        <div className='flex items-center h-20'>
                        <span class="transition-all ease-in duration-75 dark:bg-gray-900 w-2/3 group-hover:bg-opacity-0">
                            ATRAS
                        </span>
                        </div>
                    </button> 
                </div>
                
            </div>

            }

            {
                seleccionMes 
                &&
                <div className='w-6/7 flex flex-row bg-white p-8'>
                <label for="years" class="block m-12 text-4xl font-medium text-gray-900 dark:text-white">Seleccione el mes</label>
                <select id="years" size="20" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {items.map((item, index) => (
                        <option onClick={() => {asignarEstadoSeleccion(false)}} key={index}>{item}</option>
                        ))}
                </select>
                <div className='flex flex-col'>
                    <button disabled={estadoSeleccion} onClick={() => {setSeleccionDia(true); setSeleccionMes(false); asignarEstadoSeleccion(true)}}  class="rounded flex flex-row m-6 text-2xl font-medium text-gray-900 h-20 w-56 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="flex items-center h-20 transition-all ease-in duration-75 dark:bg-gray-900 w-1/3 group-hover:bg-opacity-0">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </span>
                        <div className='flex items-center h-20'>
                        <span class="transition-all ease-in duration-75 dark:bg-gray-900 w-2/3 group-hover:bg-opacity-0">
                            CONTINUAR
                        </span>
                        </div>
                    </button> 
                    <button onClick={() => {setSeleccionAño(true); setSeleccionMes(false); asignarEstadoSeleccion(true)}}  class="rounded flex flex-row m-6 text-2xl font-medium text-gray-900 h-20 w-56 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="flex items-center h-20 transition-all ease-in duration-75 dark:bg-gray-900 w-1/3 group-hover:bg-opacity-0">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </span>
                        <div className='flex items-center h-20'>
                        <span class="transition-all ease-in duration-75 dark:bg-gray-900 w-2/3 group-hover:bg-opacity-0">
                            ATRAS
                        </span>
                        </div>
                    </button> 
                </div>
                
            </div>

            }

            {
                seleccionDia 
                &&
                <div className='w-6/7 flex flex-row bg-white p-8'>
                <label for="years" class="block m-12 text-4xl font-medium text-gray-900 dark:text-white">Seleccione el día</label>
                <select id="years" size="20" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {items.map((item, index) => (
                        <option onClick={() => {asignarEstadoSeleccion(false)}} key={index}>{item}</option>
                        ))}
                </select>
                <div className='flex flex-col'>
                    <button onClick={() => {setSeleccionAño(true); setSeleccionComprador(false); asignarEstadoSeleccion(true)}}  class="rounded flex flex-row m-6 text-2xl font-medium text-gray-900 h-20 w-56 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="flex items-center h-20 transition-all ease-in duration-75 dark:bg-gray-900 w-1/3 group-hover:bg-opacity-0">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                            </svg>
                        </span>
                        <div className='flex items-center h-20'>
                        <span class="transition-all ease-in duration-75 dark:bg-gray-900 w-2/3 group-hover:bg-opacity-0">
                            ABRIR
                        </span>
                        </div>
                    </button> 
                    <button onClick={() => {setSeleccionMes(true); setSeleccionDia(false); asignarEstadoSeleccion(true)}}  class="rounded flex flex-row m-6 text-2xl font-medium text-gray-900 h-20 w-56 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="flex items-center h-20 transition-all ease-in duration-75 dark:bg-gray-900 w-1/3 group-hover:bg-opacity-0">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </span>
                        <div className='flex items-center h-20'>
                        <span class="transition-all ease-in duration-75 dark:bg-gray-900 w-2/3 group-hover:bg-opacity-0">
                            ATRAS
                        </span>
                        </div>
                    </button> 
                </div>
                
            </div>

            }
            




        </div>
        </Fragment>
    );
}

export default App;
