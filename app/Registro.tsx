import { useEffect, useState, useRef, Fragment } from "react";
import { useRouter } from 'next/router';


function Registro() {

    const router = useRouter();

    //variables para uso en el registro
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [claveConfirmacion, setClaveConfirmacion] = useState("");
    const [rol, setRol] = useState("");
    const [codigoRegistro, setCodigoRegistro] = useState("");
    const [codigoRegistroConsultado, setCodigoRegistroConsultado] = useState("");

    const [esContrasena, setEsContrasena] = useState(true);


    var direccion_login = "./login";

    function Irlogin() {
        router.push(direccion_login);
    }

    const asignarUsuario = event => {
        setUsuario(event.target.value)
    }
    const asignarClave = event => {
        setClave(event.target.value)
    }
    const asignarClaveConfirmacion = event => {
        setClaveConfirmacion(event.target.value)
    }
    const asignarRol = event => {
        setRol(event.target.value)
    }
    const asignarCodigoRegistro = event => {
        setCodigoRegistro(event.target.value)
    }

    async function addRegistro() {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: usuario,
                clave: clave,
                rol: rol,
            }),
        };
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/registro`,
            postData
        );
        const response = await res.json();
        if (response.response.message != "success") return;
    }

    async function getCodigoParaValidar(event) {
        const queryParams = new URLSearchParams(
            {
                rol: event.target.value,
            }
        )
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/traer_codigo_registro?${queryParams.toString()}`,
            postData
        );
        const response = await res.json();
        const temporal = response.response.codigo[0].codigo;
        setCodigoRegistroConsultado(temporal);
    }

    function compararcodigosRegistro() {
        if (codigoRegistro == codigoRegistroConsultado
            && clave == claveConfirmacion &&
            rol !== "" && usuario !== "" && clave !== "" &&
            codigoRegistro !== "") {
            addRegistro();
            alert("Usted ha sido registrado");
            Irlogin();
        } else if (codigoRegistro == "" || rol == "" || usuario == "" || clave == "") {
            alert('faltan campos por llenar')
        } else if (codigoRegistro !== codigoRegistroConsultado) {
            alert("El código de registro es incorrecto")
        } else if (clave != claveConfirmacion) {
            alert('La clave no coincide')
        };
    }

    return (

        <div class="border-b border-gray-900/10 pb-12 p-12 flex justify-center space-x-7 flex-col lg:flex-row">
            <div className="flex flex-col">
                <button onClick={() => { Irlogin() }} className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Regresar</button>

                <div className="p-5">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Información personal</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">Registre su información, no olvide usar el código proporcionado.</p>
                </div>

                <img className="rounded-full pt-8" src={'../assets/images/Rosa_color.jpg'} alt="" />
            </div>


            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                <div class="sm:col-span-full">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
                    <div class="mt-2">
                        <input htmlFor="email" required value={usuario} onChange={asignarUsuario} type="text" name="first-name" id="first-name" autocomplete="given-name" class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-full">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Clave</label>
                    <div class="mt-2">
                        <input required value={clave} onChange={asignarClave} type={esContrasena ? 'password' : 'text'} name="first-name" id="first-name" autocomplete="given-name" class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    {esContrasena &&
                        <button
                            type="button"
                            onClick={() => setEsContrasena((prevEsContrasena) => !prevEsContrasena)}
                            className="mt-2"
                        >


                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                        </button>
                    }
                    {!esContrasena &&
                        <button
                            type="button"
                            onClick={() => setEsContrasena((prevEsContrasena) => !prevEsContrasena)}
                            className="mt-2"
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>

                        </button>
                    }
                </div>




                <div class="sm:col-span-full">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Confirmación de la Clave</label>
                    <div class="mt-2">
                        <input required value={claveConfirmacion} onChange={asignarClaveConfirmacion} type={esContrasena ? 'password' : 'text'} name="first-name" id="first-name" autocomplete="given-name" class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-full">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Rol</label>
                    <div class="mt-2">
                        <select required value={rol} onChange={(event) => { asignarRol(event); getCodigoParaValidar(event) }} id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option selected>Escoja un rol</option>
                            <option>Administrador</option>
                            <option>Usuario</option>
                        </select>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Código de Registro</label>
                    <div class="mt-2">
                        <input required value={codigoRegistro} onChange={asignarCodigoRegistro} type="text" name="first-name" id="first-name" autocomplete="given-name" class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="min-w-screen flex items-center  justify-center">
                    <button onClick={() => { compararcodigosRegistro() }} className=" flex items-center  justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrarse</button>

                </div>
            </div>


        </div>


    );
};

export default Registro;
