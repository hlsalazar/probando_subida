import { useState, Fragment } from 'react';
import * as React from 'react';
import { useRouter } from 'next/router';
import BarraFlotante from '../../components/ModalHeadBar';



interface Data {
  tipo_reporte: string;
  fecha_reporte: string;
}

const Reportes: React.FC = () => {
  const [data, setData] = useState<Data[]>([
    { tipo_reporte: 'REPORTE VENTAS', fecha_reporte: '25-10-2023' },
    { tipo_reporte: 'REPORTE PROVEEDORES', fecha_reporte: '25-10-2023' },
    { tipo_reporte: 'REPORTE ALMACEN', fecha_reporte: '25-12-2023' },

  ]);

  const router = useRouter();
  function Regresar() {
    router.push('../indexUser');
  }

  return (
    <Fragment>
      <BarraFlotante></BarraFlotante>
    <div className='w-full h-screen  bg-gradient-to-r from-lime-300 to-cyan-300'>
      <button type="button" className="ml-8 py-2.5 px-5 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={Regresar}>
        REGRESAR
      </button>
      <div className='lg:flex lg:justify-end lg:object-right sm:justify-center sm:flex'>
        <img src={'../assets/images/logo.png'} alt="" />
      </div><br /><br />
      <button type="button" className="ml-8 p-3 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">AGREGAR NUEVO</button>

      <div className='w-full p-4 relative overflow-x-auto sm:rounded-lg'>
        <table className='sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="px-6 py-3"><span className="sr-only">VER</span> </th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TIPO DE REPORTE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">FECHA GENERADA</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr className='"bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600' key={row.tipo_reporte}>
                <td className="border border-lime-900 px-6 py-4 text-center">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">VER</a></td>

                <td className='border border-lime-900 text-center text-lg text-green-500'>{row.tipo_reporte}</td>
                <td className='border border-lime-900 text-center text-lg text-green-500'>{row.fecha_reporte}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
    </Fragment>
  );
};

export default Reportes;
