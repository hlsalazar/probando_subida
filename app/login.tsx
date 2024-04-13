import { useState, useEffect } from 'react';
//import usuarios from "../usuarios.json";
import { useRouter } from 'next/router'

const Login = () => {

  var direccion_registro = "./Registro";

  function IrRegistro(){
    router.push(direccion_registro);
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //control para conseguir datos de login

  const [usuarios, setUsuarios] = useState([]);
  const [valorUsername, setValorUsername] = useState("");
  const [valorPassword, setValorPassword] = useState("");
  const [valorRol, setValorRol] = useState("");
  const [ingresaAdmin, setIngresaAdmin] = useState(false);
  const [ingresaUsuario, setIngresaUsuario] = useState(false);

  //variables para indicar al usuario si los valores insertados estan correctos
  const [estiloUsername, setEstiloUsername] = useState({});

  //control de mensaje de error
  const [MostrarError, setMostrarError] = useState(false);


  async function getUsuarios() {

    const queryParams = new URLSearchParams({
      username: valorUsername,
      password: valorPassword,
      rol: valorRol
    });

    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login?${queryParams.toString()}`,
      postData);
    const response = await res.json();
    setUsuarios(response.usuarios);
  }

  useEffect(() => {
    getUsuarios();
  }, []);


  const asignarValorUsername = event => {
    setValorUsername(event.target.value);
  }

  const asignarValorPassword = event => {
    setValorPassword(event.target.value);
  }


  ///////////////////////

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Submitting ${username} with ${password}`);
  };
  //importante: la declaracion de router tiene que ir fuera de
  //la funcion , solamente en la funcion principal
  const router = useRouter()

  function VerificarLogin() {

    var direccion_admin = "./indexAdmin";
    var direccion_usuario = "./indexUser";

    setIngresaAdmin(false);
    setIngresaAdmin(false);



    //busqueda y compara si el valor en input esta en el objeto consultado
    for (let i = 0; i < usuarios.length; i++) {
      const usuario = usuarios[i];
      var envioRol = usuario.rol;
      var envioUser = usuario.username;

      if ((usuario.username === valorUsername) && (usuario.password === valorPassword) && (usuario.rol === 'Administrador')) {
        setIngresaAdmin(true);
        router.push(
          {
            pathname: direccion_admin,
            query: {valorUsername, envioRol}
          }
        );
        localStorage.setItem("valorGlobalUsuario", envioUser);
        localStorage.setItem("valorGlobal", envioRol); 
        break;
      } else if ((usuario.username === valorUsername) && (usuario.password === valorPassword) && (usuario.rol === 'Usuario')) {
        setIngresaUsuario(true);
        router.push(
          {
            pathname: direccion_admin,
            query: {valorUsername, envioRol}
          }
        );
        localStorage.setItem("valorGlobalUsuario", envioUser);
        localStorage.setItem("valorGlobal", envioRol); 
        break;
      } else if ((usuario.username !== valorUsername) && (usuario.password !== valorPassword)) {
        //alert("datos incorrectos");
        setEstiloUsername({ border: '2px solid red' });
        setMostrarError(true);
        continue;
      }
    };
  }


  return (
    <div className='flex justify-center h-screen items-center bg-gradient-to-r from-cyan-500	 to-lime-400 p-5'>
      <div className="flex p-5 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className='flex lg:block hidden  ml-2 mr-3'>
          <img src={'../assets/images/logo.png'} alt="" />
        </div>   
        {/*Div de login */}
        <div className="flex flex-col p-4 leading-normal">
        <div className='flex lg:hidden ml-2 mr-3 pb-5'>
          <img src={'../assets/images/logo.png'} alt="" />
        </div>   
            <div className=" md:p-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-3 " action="#">
                <div className=''>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                  <input style={estiloUsername} value={valorUsername} onChange={asignarValorUsername} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="usuario123" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input style={estiloUsername} value={valorPassword} onChange={asignarValorPassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                {MostrarError && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">Datos Incorrectos, intente de nuevo</p>}
                <div className="flex items-start">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                    </div>
                  </div>
                </div>
                <button onClick={VerificarLogin} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesión</button>
                <button onClick={IrRegistro} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrarse</button>
              </form>
            </div>
        </div>
      </div>


    </div>
  );
};

export default Login;

