import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import BarraFlotante from '../../components/ModalHeadBar';



interface Data {
  tipo_reporte: string;
  enlace: Function;
}

const Reportes_admin: React.FC = () => {

  const router = useRouter()

  //se ejecuta la toma de datos por defecto


  useEffect(() => {
    getProveedores();
    getAlmacen();
    getContFacturacion();
    getDatosFacturacion();
    getCargo();
    getCompradores();
    getDataFlor();
    getPersonal();
  }, []);

  //traida de data de la api
  const [proveedores, setProveedores] = useState([]);
  const [almacen, setAlmacen] = useState([]);
  const [facturacionCont, setFacturacionCont] = useState([]);
  const [facturacionDatos, setFacturacionDatos] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [compradores, setCompradores] = useState([]);
  const [datosFlor, setDatosFlor] = useState([]);
  const [personal, setPersonal] = useState([])

  const [valorHoraFechaSistema, setValorFechaSistema] = useState(new Date());
  const valorFecha = valorHoraFechaSistema.toLocaleDateString()
  const valorHora = valorHoraFechaSistema.toLocaleTimeString()


  async function getContFacturacion(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facturacion_contenido_reporte`,
    postData);
    const response = await res.json();
    setFacturacionCont(response.contFacturacion);
  }
  async function getDatosFacturacion(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facturacion_formulario`,
    postData);
    const response = await res.json();
    setFacturacionDatos(response.facturacion);
  }
  async function getPersonal(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/personal`,
    postData);
    const response = await res.json();
    setPersonal(response.personal);
  }
  async function getCargo(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/value_cargo`,
    postData);
    const response = await res.json();
    setCargo(response.cargo);
  }
  async function getCompradores(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comprador`,
    postData);
    const response = await res.json();
    setCompradores(response.comprador);
  }
  async function getDataFlor(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/flor`,
    postData);
    const response = await res.json();
    setDatosFlor(response.flor);
  }

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

  async function getAlmacen(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/almacen`,
    postData);
    const response = await res.json();
    setAlmacen(response.almacen);
  }

  function crearReporteAlmacen() {
    const doc = new jsPDF({
      orientation: "landscape"
    })
    doc.text("ALMACEN (Fecha: " + valorFecha + " - Hora: " + valorHora + ")", 45, 10);
    doc.addImage('../assets/images/logo.png', 'PNG', 13,3,30,10)
    autoTable(doc, { html: '#tablaAlmacen',  styles: { fontSize: 8 }});
    doc.save('Reporte_Almacén_' + valorFecha + "_" + valorHora + '.pdf');
  }
  function crearReporteGestionFlor(){
    const doc = new jsPDF({
      orientation: "landscape"
    })
    doc.text("GESTION FLOR (Fecha: " + valorFecha + " - Hora: " + valorHora + ")", 45, 10);
    doc.addImage('../assets/images/logo.png', 'PNG', 13,3,30,10)
    autoTable(doc, { html: '#tablaGestionFlor',  styles: { fontSize: 8 }});
    doc.save('Reporte_Gestion_Flor_' + valorFecha + "_" + valorHora + '.pdf');
  }
  function crearReportePersonal(){
    const doc = new jsPDF({
      orientation: "landscape"
    })
    doc.text("PERSONAL (Fecha: " + valorFecha + " - Hora: " + valorHora + ")", 45, 10);
    doc.addImage('../assets/images/logo.png', 'PNG', 13,3,30,10)
    autoTable(doc, { html: '#tablaPersonal',  styles: { fontSize: 8 }});
    doc.save('Reporte_Personal_' + valorFecha + "_" + valorHora + '.pdf');
  }

  function crearReporteFacturacion(){
    const doc = new jsPDF({
        
        orientation: "landscape"
      }
    );
    
    doc.text("FACTURACION (Fecha: " + valorFecha + " - Hora: " + valorHora + ")", 45, 10);
    doc.addImage('../assets/images/logo.png', 'PNG', 13,3,30,10)
    autoTable(doc, { html: '#tablaFacturacionDatos',  styles: { fontSize: 4 }});
    autoTable(doc, { html: '#tablaFacturacion',  styles: { fontSize: 8 }});
    doc.save('Reporte_Facturacion_' + valorFecha + "_" + valorHora + '.pdf');
  }
  function crearReporteCargo(){
    const doc = new jsPDF({
        
        orientation: "landscape"
      }
    );
    
    doc.text("VALUE CARGO (Fecha: " + valorFecha + " - Hora: " + valorHora + ")", 45, 10);
    doc.addImage('../assets/images/logo.png', 'PNG', 13,3,30,10)
    autoTable(doc, { html: '#tablaCargo',  styles: { fontSize: 8 }});
    doc.save('Reporte_Cargo_' + valorFecha + "_" + valorHora + '.pdf');
  }
  function crearReporteCompradores(){
    const doc = new jsPDF({
        
        orientation: "landscape"
      }
    );
    
    doc.text("COMPRADORES (Fecha: " + valorFecha + " - Hora: " + valorHora + ")", 45, 10);
    doc.addImage('../assets/images/logo.png', 'PNG', 13,3,30,10)
    autoTable(doc, { html: '#tablaCompradores',  styles: { fontSize: 8 }});
    doc.save('Reporte_Compradores_' + valorFecha + "_" + valorHora + '.pdf');
  }
  function crearReporteProveedores(){
    const doc = new jsPDF({
        
        orientation: "landscape"
      }
    );
    
    doc.text("PROVEEDORES (Fecha: " + valorFecha + " - Hora: " + valorHora + ")", 45, 10);
    doc.addImage('../assets/images/logo.png', 'PNG', 13,3,30,10)
    autoTable(doc, { html: '#tablaProveedores',  styles: { fontSize: 8 }});
    doc.save('Reporte_Proveedores_' + valorFecha + "_" + valorHora + '.pdf');
  }


  const [data, setData] = useState<Data[]>([
    { tipo_reporte: 'REPORTE GESTION FLOR', enlace: crearReporteGestionFlor },
    { tipo_reporte: 'REPORTE PERSONAL', enlace: crearReportePersonal },
    { tipo_reporte: 'REPORTE PROVEEDORES', enlace: crearReporteProveedores },
    { tipo_reporte: 'REPORTE ALMACEN', enlace: crearReporteAlmacen },
    { tipo_reporte: 'REPORTE FACTURACION', enlace: crearReporteFacturacion},
    { tipo_reporte: 'REPORTE VALUE CARGO', enlace: crearReporteCargo},
    { tipo_reporte: 'REPORTE COMPRADORES', enlace: crearReporteCompradores}
  ]);

  return (
    <Fragment>
      <BarraFlotante></BarraFlotante>
    <div className='py-5 w-full h-screen  bg-gradient-to-r from-lime-300 to-cyan-300'>
      <button onClick={router.back} type="button" className="ml-8 py-2.5 px-5 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        REGRESAR
      </button>
      <div className='flex lg:justify-end flex justify-center lg:object-right sm:justify-center sm:flex py-12'>
        <img className='lg:w-1/5 w-1/2' src={'../assets/images/logo.png'} alt="" />
      </div>

      <div suppressHydrationWarning className='flex flex-col md:flex-row'>
        <div suppressHydrationWarning className='px-5 pb-3'>
          <span className='p-2'>
            FECHA:
          </span>
          {valorHoraFechaSistema.toLocaleDateString()}
        </div>
        <div suppressHydrationWarning className='px-5'>
          <span className='p-2'>
            HORA:
          </span>
          {valorHoraFechaSistema.toLocaleTimeString()}
        </div>
      </div>

      <div className='flex justify-center  p-4 relative overflow-x-auto sm:rounded-lg'>
        <table className='md:w-1/2 lg:w-1/2 sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>

          </thead>
          <tbody>
            {data.map(row => (
              <tr className='"bg-white bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600' key={row.tipo_reporte}>
                <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{row.tipo_reporte}</td>
                <td className="px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white ">
                  <a onClick={row.enlace} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">DESCARGAR</a></td>
              </tr>
            ))}
          </tbody>
        </table>

        <table id="tablaProveedores" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">CEDULA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NOMBRE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TELEFONO</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">OBSERVACIONES</th>

            </tr>
          </thead>
          <tbody>
                    
          {proveedores.map((proveedores) => (
            <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={proveedores.id_proveedor}>
              <td className='border border-lime-900 text-center text-lg'>{proveedores.id_proveedor}</td>
              <td className='border border-lime-900 text-center text-lg'>{proveedores.cedula_proveedor}</td>
              <td className='border border-lime-900 text-center text-lg '>{proveedores.nombre_proveedor}</td>
              <td className='border border-lime-900 text-center text-lg '>{proveedores.telefono_proveedor}</td>
              <td className='border border-lime-900 text-center text-lg '>{proveedores.observaciones_proveedor}</td>
            </tr>
          ))}


        </tbody>
      </table>


      <table id="tablaAlmacen" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">CANTIDAD</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NOMBRE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TIPO</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">OBSERVACIONES</th>
            </tr>
          </thead>
          <tbody>
            
            {almacen.map((almacen) => (
              <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={almacen.id_materialAlmacen}>
                <td className='border border-lime-900 text-center text-lg'>{almacen.id_materialAlmacen}</td>
                <td className='border border-lime-900 text-center text-lg'>{almacen.cantidad_materialAlmacen}</td>
                <td className='border border-lime-900 text-center text-lg '>{almacen.nombre_materialAlmacen}</td>
                <td className='border border-lime-900 text-center text-lg '>{almacen.tipo_materialAlmacen}</td>
                <td className='border border-lime-900 text-center text-lg '>{almacen.observaciones_materialAlmacen}</td>
              </tr>
            ))}
            
            
          </tbody>
        </table>
<table id="tablaFacturacionDatos" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">COMPRADOR</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NUMERO FACTURA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">FECHA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">HORA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">MARKETING</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">CLIENTE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">MARCACION</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">PAIS</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">CONSIGNMENT</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">FARM CODE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">DATE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">INCOTERM</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">MAWB</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">HAWB</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">AIRLINE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">CURRIER FREIGHT</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">RUC</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NO. EMBARQUE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">PERSON INVOICE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">INVOICE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">USDA ONLY</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">OBSERVACIONES</th>

            </tr>
          </thead>
          <tbody>
            
            {facturacionDatos.map((factDat) => (
              <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={factDat.id_calFacturacion}>
                <td className='border border-lime-900 text-center text-lg '>{factDat.comprador_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.numeroFactura_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.fecha_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.hora_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factDat.id_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factDat.marketingName_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factDat.cliente_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.marcacion_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.pais_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.consignment_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factDat.farmCode_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factDat.date_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.incoterm_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.countryCode_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.mawb_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factDat.hawb_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factDat.airLine_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.currierFreight_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.ruc_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.noEmbarque_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.personInvoice_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.invoice_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.usdaOnly_calFacturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factDat.observaciones_calFacturacion}</td>
              </tr>
            ))}
            
            
          </tbody>
        </table>
        <table id="tablaFacturacion" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">FECHA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">HORA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">PICES TYPE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL PICES</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">EQ. FULL BOXES</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">PRODUCT ROSAS</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">LONGITUD</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NO. BUNCHES</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">INDICATOR</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">HTS</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NANDINA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL STEMS</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">STEMS / BUNCH</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">UNIT PRICE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL VALUE</th>
            </tr>
          </thead>
          <tbody>
            
            {facturacionCont.map((factCont) => (
              <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={factCont.id_cont_facturacion}>
                <td className='border border-lime-900 text-center text-lg '>{factCont.fecha_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.hora_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factCont.id_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factCont.picesType_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factCont.totalPices_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.eqFullBoxes_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.productRosas_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.longitud_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factCont.noBunches_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factCont.Indicator_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.hts_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.nandina_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.totalStems_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factCont.stemsPerBunch_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg'>{factCont.unitPrice_cont_facturacion}</td>
                <td className='border border-lime-900 text-center text-lg '>{factCont.totalValue_cont_facturacion}</td>
              </tr>
            ))}
            
            
          </tbody>
        </table>

        <table id="tablaCargo" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NOMBRE</th>
            </tr>
          </thead>
          <tbody>
            
            {cargo.map((cargo) => (
              <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={cargo.id}>
                <td className='border border-lime-900 text-center text-lg'>{cargo.id}</td>
                <td className='border border-lime-900 text-center text-lg'>{cargo.name}</td>
              </tr>
            ))}
            
            
          </tbody>
        </table>
        <table id="tablaCompradores" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NOMBRE</th>
            </tr>
          </thead>
          <tbody>
            
            {compradores.map((compra) => (
              <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={compra.id_comp}>
                <td className='border border-lime-900 text-center text-lg'>{compra.id_comp}</td>
                <td className='border border-lime-900 text-center text-lg'>{compra.nombre_comp}</td>
              </tr>
            ))}
            
            
          </tbody>
        </table>
        <table id="tablaPersonal" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">CEDULA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">NOMBRE</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">CARGO</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">DIRECCION</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TELEFONO</th>
            </tr>
          </thead>
          <tbody>
            
            {personal.map((perso) => (
              <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={perso.id_personal}>
                <td className='border border-lime-900 text-center text-lg'>{perso.id_personal}</td>
                <td className='border border-lime-900 text-center text-lg'>{perso.cedula_personal}</td>
                <td className='border border-lime-900 text-center text-lg'>{perso.nombre_personal}</td>
                <td className='border border-lime-900 text-center text-lg'>{perso.cargo_personal}</td>
                <td className='border border-lime-900 text-center text-lg'>{perso.direccion_personal}</td>
                <td className='border border-lime-900 text-center text-lg'>{perso.telefono_personal}</td>
              </tr>
            ))}
            
            
          </tbody>
        </table>
        
        <table id="tablaGestionFlor" style={{display:'none'}} className=' sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">PROVEEDOR</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">VARIEDAD</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL MALLAS</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS POR MALLA</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS SUELTOS</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL TALLOS</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS 40cm</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS 50cm</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS 60cm</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS 70cm</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS 80cm</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS 90cm</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL BONCHES</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS NACIONAL</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TALLOS SOBRANTES</th>
              <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL DE VARIEDAD</th>
            </tr>
          </thead>
          <tbody>
            
            {datosFlor.map((flor) => (
              <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" key={flor.id_gestionFlor}>
                <td className='border border-lime-900 text-center text-lg'>{flor.id_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.PROVEEDOR}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.VARIEDAD}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tMallas_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tTallosxMalla_gestionflor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tallosSueltos_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tTallos_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tallos40_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tallos50_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tallos60_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tallos70_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tallos80_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.talllos90_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tBonches_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tallosNacional_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.talloSobrante_gestionFlor}</td>
                <td className='border border-lime-900 text-center text-lg'>{flor.tVariedad_gestionFlor}</td>

   
              </tr>
            ))}
            
            
          </tbody>
        </table>
    </div>

    </div >
    </Fragment>
  );

};

export default Reportes_admin;