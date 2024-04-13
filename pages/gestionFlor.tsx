import React from 'react';
import { useEffect, useState, useRef, Fragment } from "react";
import ModalEditar from "../components/ModalEditar";
import ModalEliminar from "../components/ModalEliminar";
import ModalFlor from "../components/ModalFlor";
import { useRouter } from 'next/router';
// import Proveedores from './proveedores/gestionProveedores';
import BarraFlotante from '../components/ModalHeadBar';


const Flor: React.FC = () => {
    const router = useRouter()

    const [idFlor, setIdFlor] = useState<number | null>(null);
    const [id_gestionFlor, setid_gestionFlor] = useState<number | null>(null);
    const [idProveedor, setIdProveedor] = useState([]);
    const [flor, setFlor] = useState([]);
    const [proveedor, setProveedor] = useState([]);

    const [created, setCreated] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deletedError, setDeletedError] = useState(false);
    const [editError, setEditError] = useState(false);

    //control de modal, declaracion de const
    const [showModal, setShowModal] = useState(false);
    const [showModalFlor, setShowModalFlor] = useState(false);
    const [showModalEditar, setShowModalEdit] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    //valor id para al dar click que ejecute query de delete
    const [valorBorrar, setValorBorrar] = useState("");

    //valor que se usa de filtro
    const [valorAFiltrar, setValorAFiltrar] = useState("");

    const asignarValorAFiltrar = event => {
        setValorAFiltrar(event.target.value);
    }

    //filtra los datos de consulta
    async function getFiltroFlor() {

        const queryParams = new URLSearchParams({
            id_gestionFlor: valorAFiltrar,
            PROVEEDOR: valorAFiltrar,
            VARIEDAD: valorAFiltrar
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/flor_filtro?${queryParams.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const response = await res.json();
        //en caso de no encontrar el elemento
        if (response.flor.length === 0) {
            alert("No se encontraron resultados, vuelve a buscar");
        } else {
            setFlor(response.flor);
        }

    }

    async function AccionActivarFiltro(event) {
        event.preventDefault();
        await getFiltroFlor();

    }
    //desactivar filtro
    async function AccionDesactivarFiltro() {
        setValorAFiltrar("");
        getFlor();
    }
    async function actualizarContenido(event) {
        event.preventDefault();
        await getFlor();
    }

    //control de valores de ingreso
    const [valorProveedor, setProveedorNombre] = useState([]);
    const [valorVariedad, setValorVariedad] = useState();
    const [valortMallas, setValortMallas] = useState();
    const [valorTallosxMalla, setValorTallosxMalla] = useState();
    const [valorTallosSuelto, setValorTallosSuelto] = useState();
    const [valortTallos, settTallos] = useState();
    const [valorTallos40, setValorTallos40] = useState();
    const [valorTallos50, setValorTallos50] = useState();
    const [valorTallos60, setValorTallos60] = useState();
    const [valorTallos70, setValorTallos70] = useState();
    const [valorTallos80, setValorTallos80] = useState();
    const [valorTallos90, setValorTallos90] = useState();
    const [valortBonches, setValortBonches] = useState();
    const [valorTallosNacional, setValorTallosNacional] = useState();
    const [valorTallosSobrante, setValorTallosSobrante] = useState();
    const [valortVariedad, setValortVariedad] = useState();

    async function getFlor() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/flor`,
            postData);
        const response = await res.json();
        setFlor(response.flor);
    }

    async function addFlor() {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                proveedor_gestionFlor: guardarProveedor,
                variedad_gestionFlor: guardarVariedad,
                tMallas_gestionFlor: Mallas,
                tTallosxMalla_gestionflor: tallosPorMalla,
                tallosSueltos_gestionFlor: tallosSueltos,
                tTallos_gestionFlor: totalTallos.toString(),
                tallos40_gestionFlor: bonches40,
                tallos50_gestionFlor: bonches50,
                tallos60_gestionFlor: bonches60,
                tallos70_gestionFlor: bonches70,
                tallos80_gestionFlor: bonches80,
                tallos90_gestionFlor: bonches90,
                tBonches_gestionFlor: totalBonches.toString(),
                tNacional_gestionFlor: totalNacional,
                tallosSobrante_gestionFlor: totalSobrantes,
                tVariedad_gestionFlor: totalVariedad.toString(),

            }),
        };
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/flor`,
            postData
        );
        const response = await res.json();
        if (response.response.message != "Agregado") return;
        getFlor();
        setCreated(true);
        setShowModalFlor(false);
    }

    async function editFlor() {
        if (!idFlor) return;
        const postData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_gestionFlor: idFlor,
                proveedor_gestionFlor: valorProveedor,
                variedad_gestionFlor: valorVariedad,
                tMallas_gestionFlor: valortMallas,
                tTallosxMalla_gestionflor: valorTallosxMalla,
                tallosSueltos_gestionFlor: valorTallosSuelto,
                tTallos_gestionFlor: valortTallos,
                tallos40_gestionFlor: valorTallos40,
                tallos50_gestionFlor: valorTallos50,
                tallos60_gestionFlor: valorTallos60,
                tallos70_gestionFlor: valorTallos70,
                tallos80_gestionFlor: valorTallos80,
                tallos90_gestionFlor: valorTallos90,
                tBonches_gestionFlor: valortBonches,
                tallosNacional_gestionFlor: valorTallosNacional,
                talloSobrante_gestionFlor: valorTallosSobrante,
                tVariedad_gestionFlor: valortVariedad,

                
            }),
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/flor`,
            postData
        );
        const response = await res.json();
        if (response.response.message === "error") return setEditError(true);
        await getFlor();
        setUpdated(true);
        setIdFlor(null);
        setShowModalEdit(false);
    }
    const handleEdit = (id: number) => {
        setIdFlor(id);
        setShowModalEdit(true);
    }
    async function deleteFlor() {
        if (!idFlor) return;
        const postData = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_gestionFlor: idFlor,
            }),
        };
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/flor`,
            postData
        );
        const response = await res.json();
        if (response.response.message === "error al eliminar") return setDeletedError(true);
        setFlor(flor.filter((a) => a.id_gestionFlor !== idFlor));
        setDeleted(true);
        setIdFlor(null);
        setShowModalEliminar(false);
    }
    const handleDelete = (id: number) => {
        setIdFlor(id);
        setShowModalEliminar(true);
    }
    useEffect(() => {
        getFlor();
        getProveedores();
        getVariedad()
    }, []);





    // Define la función para asignar el valor del proveedor seleccionado a la variable "valorProveedor"

    const asignarProveedor = event => {
        setProveedorNombre(event.target.value);
    }

    const asignarVariedad = event => {
        setValorVariedad(event.target.value);
    }

    const asignartMallas = event => {
        setValortMallas(event.target.value);
    }
    const asignartTallosxMalla = event => {
        setValorTallosxMalla(event.target.value);
    }
    const asignartallosSuelto = event => {
        setValorTallosSuelto(event.target.value);
    }
    const asignartTallos = event => {
        settTallos(event.target.value);
    }
    const asignarTallos40 = event => {
        setValorTallos40(event.target.value);
    }
    const asignarTallos50 = event => {
        setValorTallos50(event.target.value);
    }
    const asignarTallos60 = event => {
        setValorTallos60(event.target.value);
    }
    const asignarTallos70 = event => {
        setValorTallos70(event.target.value);
    }
    const asignarTallos80 = event => {
        setValorTallos80(event.target.value);
    }
    const asignarTallos90 = event => {
        setValorTallos90(event.target.value);
    }
    const asignartBonches = event => {
        setValortBonches(event.target.value);
    }
    const asignarTallosNacional = event => {
        setValorTallosNacional(event.target.value);
    }

    const asignarTallosSobrante = event => {
        setValorTallosSobrante(event.target.value);
    }
    const asignartVariedad = event => {
        setValortVariedad(event.target.value);
    }

    //variables para data de comprador
    const [proveedores, setProveedores] = useState([]);
    //conseguir data sobre comprador 
    async function getProveedores() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/proveedores`,
            postData);
        const response = await res.json();
        setProveedores(response.proveedores);
    }

    const opcionesComprador = proveedores.map((vard) => ({
        value: vard.nombre_proveedor,
        label: vard.nombre_proveedor
    }));

    const [variedades, setVariedades] = useState([]);

    //funcion de consulta para variedad
    async function getVariedad() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/variedad`,
            postData);
        const response = await res.json();
        setVariedades(response.variedad);
    }

    const opcionesVariedad = variedades.map((vard) => ({
        value: vard.nombre_VariedadFlor,
        label: vard.nombre_VariedadFlor
    }));

    const [Mallas, setMallas] = useState("");
    const [tallosPorMalla, setTallosPorMalla] = useState("");
    const [tallosSueltos, setTallosSueltos] = useState("");
    const [totalTallos, setTotalTallos] = useState("");
    const [bonches40, setBonches40] = useState("")
    const [bonches50, setBonches50] = useState("")
    const [bonches60, setBonches60] = useState("")
    const [bonches70, setBonches70] = useState("")
    const [bonches80, setBonches80] = useState("")
    const [bonches90, setBonches90] = useState("")
    const [totalBonches, setTotalBonches] = useState("")
    const [tallosPorBonche, setTallosPorBonche] = useState("")
    const [totalNacional, setTotalNacional] = useState("")
    const [totalSobrantes, setTotalSobrantes] = useState("")
    const [totalVariedad, setTotalVariedad] = useState("")

    const [guardarProveedor, setGuardarProveedor] = useState("")
    const [guardarVariedad, setGuardarVariedad] = useState("")



    const asignarMallas = event => {
        setMallas(event.target.value)
        let calculo = (event.target.value * tallosPorMalla + Number(tallosSueltos));

        setTotalTallos(calculo)
    }

    const asignarTallosMalla = event => {
        setTallosPorMalla(event.target.value)
        let calculo = (Mallas * event.target.value + Number(tallosSueltos));

        setTotalTallos(calculo)
    }

    const asignarTallosSueltos = event => {
        setTallosSueltos(event.target.value)
        let calculo = (Mallas * tallosPorMalla + Number(event.target.value));

        setTotalTallos(calculo)
    }

    const asignarBonches40 = event => {
        setBonches40(event.target.value);
        let calculo = (Number(event.target.value) + Number(bonches50) + Number(bonches60) + Number(bonches70) + Number(bonches80) + Number(bonches90));

        setTotalBonches(calculo)
    }
    const asignarBonches50 = event => {
        setBonches50(event.target.value);
        let calculo = (Number(bonches40) + Number(event.target.value) + Number(bonches60) + Number(bonches70) + Number(bonches80) + Number(bonches90));

        setTotalBonches(calculo)
    }
    const asignarBonches60 = event => {
        setBonches60(event.target.value);
        let calculo = (Number(bonches40) + Number(bonches50) + Number(event.target.value) + Number(bonches70) + Number(bonches80) + Number(bonches90));

        setTotalBonches(calculo)
    }
    const asignarBonches70 = event => {
        setBonches70(event.target.value);
        let calculo = (Number(bonches40) + Number(bonches50) + Number(bonches60) + Number(event.target.value) + Number(bonches80) + Number(bonches90));

        setTotalBonches(calculo)
    }
    const asignarBonches80 = event => {
        setBonches80(event.target.value);
        let calculo = (Number(bonches40) + Number(bonches50) + Number(bonches60) + Number(bonches70) + Number(event.target.value) + Number(bonches90));

        setTotalBonches(calculo)
    }
    const asignarBonches90 = event => {
        setBonches90(event.target.value);
        let calculo = (Number(bonches40) + Number(bonches50) + Number(bonches60) + Number(bonches70) + Number(bonches80) + Number(event.target.value));

        setTotalBonches(calculo)
    }
    const asignarTallosPorBonche = event => {
        setTallosPorBonche(event.target.value);
        let calculo = (Number(totalNacional) + Number(totalSobrantes) + Number(totalBonches * event.target.value));

        setTotalVariedad(calculo)
    }
    const asignarNacional = event => {
        setTotalNacional(event.target.value);
        let calculo = (Number(event.target.value) + Number(totalSobrantes) + Number(totalBonches * tallosPorBonche));

        setTotalVariedad(calculo)
    }
    const asignarSobrantes = event => {
        setTotalSobrantes(event.target.value);
        let calculo = (Number(totalNacional) + Number(event.target.value) + Number(totalBonches * tallosPorBonche));

        setTotalVariedad(calculo)
    }

    const asignarGuardarProveedor = event => {
        setGuardarProveedor(event.target.value)
    }
    const asignarGuardarVariedad = event => {
        setGuardarVariedad(event.target.value)
    }


    return (
        <Fragment>

            <BarraFlotante></BarraFlotante>




            <div className='bg-gradient-to-r from-lime-500 to-cyan-500 h-screen-max px-2 md:px-20 py-10'>
                <div className="relative space-y-10">
                    <button onClick={() => { router.back() }} className="bg-green-700 px-5 py-2.5 rounded-md group-hover:bg-opacity-0 font-bold text-white" >
                        REGRESAR
                    </button>

                    {created ? <div>Success!</div> :
                        null}
                    <div className='flex justify-between gap-2 lg:flex-row flex-col' >
                        <button type="button" className="py-2.5 px-5 text-sm font-medium rounded-lg bg-blue-600 ring-0 text-white hover:bg-blue-700" onClick={() => setShowModalFlor(true)} >AGREGAR NUEVO</button>

                        <form className='grow'>
                            <div className="px-2 relative lg:w-1/2 w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input value={valorAFiltrar} onChange={asignarValorAFiltrar} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese aquí su búsqueda"></input>
                                <button onClick={AccionActivarFiltro} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-16 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">BUSCAR</button>
                                <button onClick={AccionDesactivarFiltro} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">X</button>

                            </div>
                            
                        </form>
                    </div>
                    
                    <button className='bg-blue-400 ml-12 py-1 px-4 mr-2 mb-2' onClick={() => {actualizarContenido(event)}}>
                <div className='flex flex-row space-x-4'>
                  <a>
                    Actualizar
                  </a>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                </button>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="overflowY: 'auto' scroll-smooth w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 font-medium"># </th>
                                    <th scope="col" className="px-6 py-3 text-base">PROVEEDOR</th>
                                    <th scope="col" className="px-6 py-3 text-base"> VARIEDAD </th>
                                    <th scope="col" className="px-6 py-3 text-base">T. MALLAS</th>
                                    <th scope="col" className="px-6 py-3 text-base">T. TALLOSxMALLA</th>
                                    <th scope="col" className="px-6 py-3 text-base">TALLOS SUELTOS</th>
                                    <th scope="col" className="px-6 py-3 text-base">T. TALLOS</th>
                                    <th scope="col" className="px-6 py-3">40</th>
                                    <th scope="col" className="px-6 py-3">50</th>
                                    <th scope="col" className="px-6 py-3">60</th>
                                    <th scope="col" className="px-6 py-3">70</th>
                                    <th scope="col" className="px-6 py-3">80</th>
                                    <th scope="col" className="px-6 py-3">90</th>
                                    <th scope="col" className="px-6 py-3 text-base">T. BONCHES</th>
                                    <th scope="col" className="px-6 py-3 text-base">T. NACIONAL</th>
                                    <th scope="col" className="px-6 py-3 text-base">TALLOS SOBRANTES</th>
                                    <th scope="col" className="px-6 py-3 text-base">T. VARIEDAD</th>
                                    <th scope="col" className="px-6 py-3"> <span className="sr-only">EDITAR</span> </th>
                                    <th scope="col" className="px-6 py-3"> <span className="sr-only">ELIMINAR</span> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {flor.map((flor) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" key={flor.id_gestionFlor}>
                                        <td className="px-6 py-4 text-center">{flor.id_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{flor.PROVEEDOR}</td>
                                        <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-lime-500">{flor.VARIEDAD}</td>
                                        <td className="px-6 py-4 text-center">{flor.tMallas_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tTallosxMalla_gestionflor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tallosSueltos_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{flor.tTallos_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tallos40_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tallos50_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tallos60_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tallos70_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tallos80_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.talllos90_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{flor.tBonches_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.tallosNacional_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center">{flor.talloSobrante_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{flor.tVariedad_gestionFlor}</td>
                                        <td className="px-6 py-4 text-center text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEdit(flor.id_gestionFlor)}>EDITAR</a></td>
                                        <td className="px-6 py-4 text-center text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleDelete(flor.id_gestionFlor)}>ELIMINAR</a> </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                <ModalFlor isVisible={showModalFlor} onClose={() => setShowModalFlor(false)}>
                    <div style={{ maxHeight: '80vh', overflowY: 'auto' }} >
                        <table className="w-full border mt-6">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="px-12 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">PROVEEDOR</div>
                                    </th>
                                    <th className="px-12 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center"> VARIEDAD </div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TOTAL MALLA</div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS X MALLA</div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS SUELTOS</div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TOTAL TALLOS</div>
                                    </th>
                                    <th className="border-r cursor-pointer text-sm font-thin text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS 40</div>
                                    </th>
                                    <th className="border-r cursor-pointer text-sm font-thin text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS 50</div>
                                    </th>
                                    <th className="border-r cursor-pointer text-sm font-thin text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS 60</div>
                                    </th>
                                    <th className="border-r cursor-pointer text-sm font-thin text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS 70</div>
                                    </th>
                                    <th className="border-r cursor-pointer text-sm font-thin text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS 80</div>
                                    </th>
                                    <th className="border-r cursor-pointer text-sm font-thin text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS 90</div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TOTAL BONCHES </div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS POR BONCHE </div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS NACIONAL </div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-normal text-gray-900">
                                        <div className="flex items-center justify-center">TALLOS SOBRANTES </div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                                        <div className="flex items-center justify-center">TOTAL VARIEDAD </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50 text-center">
                                    <td className="p-2 border-r">
                                        <select className='text-center' onClick={() => { }} onChange={(event) => { asignarGuardarProveedor(event) }} size="1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected></option>
                                            {opcionesComprador.map((opcion) => (
                                                <option value={opcion.value}>{opcion.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-2 border-r">
                                        <select onChange={asignarGuardarVariedad} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected></option>
                                            {opcionesVariedad.map((opcion) => (
                                                <option value={opcion.value}>{opcion.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={Mallas} onChange={(event) => { asignarMallas(event) }} className="border w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={tallosPorMalla} onChange={(event) => { asignarTallosMalla(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={tallosSueltos} onChange={(event) => { asignarTallosSueltos(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={totalTallos} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />

                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={bonches40} onChange={(event) => { asignarBonches40(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={bonches50} onChange={(event) => { asignarBonches50(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={bonches60} onChange={(event) => { asignarBonches60(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={bonches70} onChange={(event) => { asignarBonches70(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={bonches80} onChange={(event) => { asignarBonches80(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={bonches90} onChange={(event) => { asignarBonches90(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={totalBonches} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={tallosPorBonche} onChange={(event) => { asignarTallosPorBonche(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={totalNacional} onChange={(event) => { asignarNacional(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />
                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={totalSobrantes} onChange={(event) => { asignarSobrantes(event) }} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />

                                    </td>
                                    <td className="p-2 border-r">
                                        <input value={totalVariedad} className="border p-1 w-12 h-10" id="grid-last-name" type="number" placeholder="" />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={(event) => { addFlor(); actualizarContenido(event); setShowModalFlor(false); }} type="submit" className="ml-8 py-2.5 px-5 mr-2 mb-2 mt-6 text-sm font-medium text-gray-900 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                            Guardar flor
                        </button>
                    </div>
                </ModalFlor>
                <ModalEditar isVisible={showModalEditar} onClose={() => setShowModalEdit(false)}>
                    <div style={{ maxHeight: '45vh', overflowY: 'auto' }}>
                        <form className="w-full max-w-lg">
                            <div className="w-full md:w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">PROVEEDOR</label>
                                <input value={valorProveedor} onChange={asignarProveedor} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-proveedor" type="text" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">VARIEDAD</label>
                                <input value={valorVariedad} onChange={asignarVariedad} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-variedad" type="text" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TOTAL MALLAS</label>
                                <input value={valortMallas} onChange={asignartMallas} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS x MALLA</label>
                                <input value={valorTallosxMalla} onChange={asignartTallosxMalla} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS SUELTOS </label>
                                <input value={valorTallosSuelto} onChange={asignartallosSuelto} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TOTAL TALLOS </label>
                                <input value={valortTallos} onChange={asignartTallos} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS 40 </label>
                                <input value={valorTallos40} onChange={asignarTallos40} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS 50 </label>
                                <input value={valorTallos50} onChange={asignarTallos50} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS 60 </label>
                                <input value={valorTallos60} onChange={asignarTallos60} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS 70 </label>
                                <input value={valorTallos70} onChange={asignarTallos70} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS 80 </label>
                                <input value={valorTallos80} onChange={asignarTallos80} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS 90 </label>
                                <input value={valorTallos90} onChange={asignarTallos90} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TOTAL BONCHES </label>
                                <input value={valortBonches} onChange={asignartBonches} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS NACIONAL </label>
                                <input value={valorTallosNacional} onChange={asignarTallosNacional} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TALLOS SOBRANTE </label>
                                <input value={valorTallosSobrante} onChange={asignarTallosSobrante} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" form="grid-last-name">TOTAL VARIEDAD
                                </label>
                                <input value={valortVariedad} onChange={asignartVariedad} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-6 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="" />

                                <button onClick={() => { editFlor(); getFlor(); setShowModalFlor(false); }} type="submit" className="ml-8 py-2.5 px-5 mr-2 mb-2 mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >
                                    Terminar y Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalEditar>
                <ModalEliminar isVisible={showModalEliminar} onClose={() => setShowModalEliminar(false)}>
                    <div className='flex flex-col items-center'>
                    <label className="font-bold text-2xl m-16">Estas seguro de eliminar? </label>
                    <br></br>
                    <button type="button" className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-m px-5 py-2.5 " onClick={deleteFlor}>
                        Si, eliminar
                    </button>

                    </div>
                    
                </ModalEliminar>
            </div>
        </Fragment>

    );
};
export default Flor;