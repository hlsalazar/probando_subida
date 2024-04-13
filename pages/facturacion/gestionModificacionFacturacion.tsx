import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import Modal from "../../components/ModalFacturacion";
import BarraFlotante from '../../components/ModalHeadBar';


const Facturacion: React.FC = () => {

  //definicion de variables de entrada para modificacion de factura

  const router = useRouter()

  //const compradorBusquedaFactura = router.query;
  //const fechaBusquedaFactura = "";
  //const horaBusquedaFactura = "";
  const {compradorBusquedaFactura, fechaBusquedaFactura, horaBusquedaFactura} = router.query;

  const queryComprador = decodeURIComponent(compradorBusquedaFactura);
  const queryFecha = decodeURIComponent(fechaBusquedaFactura);
  const queryHora = decodeURIComponent(horaBusquedaFactura);



  
  //control de secciones de pantalla
  const [estadoPrimeraSeccion, setEstadoPrimeraSeccion] = useState(true);
  const [estadoSegundaSeccion, setEstadoSegundaSeccion] = useState(false);
  const [estadoTerceraSeccion, setEstadoTerceraSeccion] = useState(false);

  //variables de formulario
  const [valorIdFacturacion, setValorIdFacturacion] = useState("");
  const [valorMarketingName, setValorMarketingName] = useState("");
  const [valorCliente, setValorCliente] = useState("");
  const [valorMarcacion, setValorMarcacion] = useState("");
  const [valorPais, setValorPais] = useState("");
  const [valorConsignment, setValorConsignment] = useState("");
  const [valorFarmCode, setValorFarmCode] = useState("");
  const [valorDate, setValorDate] = useState("");
  const [valorIncoterm, setValorIncoterm] = useState("");
  const [valorCountryCode, setValorCountryCode] = useState("");
  const [valorMawb, setValorMawb] = useState("");
  const [valorHawb, setValorHawb] = useState("");
  const [valorAirLine, setValorAirLine] = useState("");
  const [valorCurrierFreight, setValorCurrierFreight] = useState("");
  const [valorRuc, setValorRuc] = useState("");
  const [valorNoEmbarque, setValorNoEmbarque] = useState("");
  const [valorPersonInvoice, setValorPersonInvoice] = useState("");
  const [valorInvoice, setValorInvoice] = useState("");
  const [valorUsdaOnly, setValorUsdaOnly] = useState("");
  const [valorObservacionesFactura, setValorObservacionesFactura] = useState("");

  //valores de contenido de factura
  const [valorIdContFacturacion, setValorIdContFacturacion] = useState("");
  const [valorPicesTypeContFacturacion, setValorPicesTypeContFacturacion] = useState("");
  const [valorTotalPices, setValorTotalPices] = useState("");
  const [valorEqFullBoxesContFacturacion, setValorEqFullBoxesContFacturacion] = useState("");
  const [valorVariedades, setValorVariedades] = useState("");
  const [valorLongitudIdContFacturacion, setValorLongitudIdContFacturacion] = useState("");
  const [valorNumeroBunches, setValorNumeroBunches] = useState("");
  const [valorIndicatorContFacturacion, setValorIndicatorContFacturacion] = useState("");
  const [valorHtsContFacturacion, setValorHtsContFacturacion] = useState("");
  const [valorNandinaContFacturacion, setValorNandinaContFacturacion] = useState("");
  const [valorTotalStemsIdContFacturacion, setValorTotalStemsIdContFacturacion] = useState("");
  const [valorStemsPerBunch, setValorStemsPerBunch] = useState("");
  const [valorUnitPrice, setValorUnitPrice] = useState("");
  const [valorTotalContFacturacion, setValorTotalContFacturacion] = useState("");



  const [facturaciones, setFacturaciones] = useState([]);

  //control de modal, declaracion de const
  const [showModal, setShowModal] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalVaciarTabla, setShowModalVaciarTabla] = useState(false);
  const [showModalAdvertenciaGuardado, setShowModalAdvertenciaGuardado] = useState(false);
  const [showModalConfirmarActualizar, setShowModalConfirmarActualizar] = useState(false);
  const [showModalCargaDatos, setShowModalCargaDatos] = useState(false);

  //valores defecto para cuadro de update
  const [valorDefectoIdContFacturacion, setValorDefectoIdContFacturacion] = useState("");
  const [valorDefectoPicesTypeContFacturacion, setValorDefectoPicesTypeContFacturacion] = useState("");
  const [valorDefectoTotalPices, setValorDefectoTotalPices] = useState("");
  const [valorDefectoEqFullBoxesContFacturacion, setValorDefectoEqFullBoxesContFacturacion] = useState("");
  const [valorDefectoVariedades, setValorDefectoVariedades] = useState("");
  const [valorDefectoLongitudIdContFacturacion, setValorDefectoLongitudIdContFacturacion] = useState("");
  const [valorDefectoNumeroBunches, setValorDefectoNumeroBunches] = useState("");
  const [valorDefectoIndicatorContFacturacion, setValorDefectoIndicatorContFacturacion] = useState("");
  const [valorDefectoHtsContFacturacion, setValorDefectoHtsContFacturacion] = useState("");
  const [valorDefectoNandinaContFacturacion, setValorDefectoNandinaContFacturacion] = useState("");
  const [valorDefectoTotalStemsIdContFacturacion, setValorDefectoTotalStemsIdContFacturacion] = useState("");
  const [valorDefectoStemsPerBunch, setValorDefectoStemsPerBunch] = useState("");
  const [valorDefectoUnitPrice, setValorDefectoUnitPrice] = useState("");
  const [valorDefectoTotalContFacturacion, setValorDefectoTotalContFacturacion] = useState("");

  //valor id para al dar click que ejecute query de delete
  const [valorBorrar, setValorBorrar] = useState("");

  //valor que se usa de filtro
  const [valorAFiltrar, setValorAFiltrar] = useState("");

  //valor de paises de database
  const [paises, setPaises] = useState([]);
  //valor de value cargo de database
  const [valueCargo, setValueCargo] = useState([]);

  //contenido de cuerpo de facturacion
  const [valueContFacturaciones, setContFacturaciones] = useState([]);

  //variedad de flor
  const [variedades, setVariedades] = useState([]);

  //valor total de "total pices"
  const [totalTotalPices, setTotalTotalPices] = useState("");
  //valor total de "eq full boxes"
  const [totalEqFull, setTotalEqFull] = useState();
  //valor total de "total value"
  const [totalTotalValue,setTotalTotalValue] = useState();


  //variables de fecha y hora para su uso en consulta de facturacion
  const [valorHoraFechaSistema, setValorFechaSistema] = useState(new Date());
  const [fecha] = useState(new Date().toLocaleDateString());
  const [hora] = useState(new Date().toLocaleTimeString());

  //variables para data de comprador
  const [comprador, setComprador] = useState([]);

  //variables para numero de factura se debe enviar el nombre de comprador
  const [valorNombreFactura, setValorNombreFactura] = useState("");
  const [valorNumeroFactura, setValorNumeroFactura] = useState([]);

  //variable para guardar numero de factura
  const [valorNumeroFacturaGuardar, setValorNumeroFacturaGuardar] = useState("");



  //convirtiendo en array el valor de paises para que se mapee una sola vez
  //y se muestre solamente un solo componente select
  const opcionesPaises = paises.map((pais) => ({
    value: pais.name,
    label: pais.name
  }));

  const opcionesValueCargo = valueCargo.map((cargo) => ({
    valueCargo: cargo.name,
    labelCargo: cargo.name
  }));
  
  const opcionesVariedad = variedades.map((vard) => ({
    value: vard.nombre_VariedadFlor,
    label: vard.nombre_VariedadFlor
  }));

  //funcion de consulta de paises
  async function getPaises(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/paises`,
    postData);
    const response = await res.json();
    setPaises(response.paises);
  }
  
  //funcion de consulta de value cargo
  async function getValueCargo(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/value_cargo`,
    postData);
    const response = await res.json();
    setValueCargo(response.cargo);
  }  


  //funciones de consulta facturacion
  async function getFacturacion(){

    const queryParams = new URLSearchParams(
      {
        comprador : queryComprador,
        fecha : queryFecha,
        hora : queryHora
      }
    )

    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/modificacion_facturacion_formulario?${queryParams.toString()}`,
    postData);
    const response = await res.json();
    setFacturaciones(response.facturacion);
  }

    //funciones de consulta de contenido de cuerpo facturacion
    /*`
    async function getContFacturacion(){
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facturacion_contenido`,
    postData);
    const response = await res.json();
    setContFacturaciones(response.contFacturacion);
  }*/
  async function getContFacturacion(){

    const queryParams = new URLSearchParams(
      {
        fecha_cont_facturacion: queryFecha,
        hora_cont_facturacion: queryHora
      }
    )
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facturacion_contenido?${queryParams.toString()}`,
    postData);
    const response = await res.json();
    setContFacturaciones(response.contFacturacion);
  }

  //funcion de consulta para variedad
  async function getVariedad(){
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

  //funcion consulta para "total pices"
  async function getTotalPices(){
    const queryParams = new URLSearchParams(
      {
        fecha_cont_facturacion: queryFecha,
        hora_cont_facturacion: queryHora
      }
    )
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facturacion_cont_sumas?${queryParams.toString()}`,
    postData);
    const response = await res.json();
    const temporal = response.totalPices[0]["SUM(totalPices_cont_facturacion)"];
    setTotalTotalPices(temporal);
  }

    //funcion consulta para "total eq full boxes"
    async function getTotalEqFull(){
      const queryParams = new URLSearchParams(
        {
          fecha_cont_facturacion: queryFecha,
          hora_cont_facturacion: queryHora
        }
      )
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facturacion_cont_sumas2?${queryParams.toString()}`,
      postData);
      const response = await res.json();
      const temporal = response.totalEqFull[0]["SUM(eqFullBoxes_cont_facturacion)"];
      setTotalEqFull(temporal);
    }

    //funcion consulta para "total del valor total"
    async function getTotalTotalValue(){
      const queryParams = new URLSearchParams(
        {
          fecha_cont_facturacion: queryFecha,
          hora_cont_facturacion: queryHora
        }
      )
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facturacion_cont_sumas3?${queryParams.toString()}`,
      postData);
      const response = await res.json();
      const temporal = response.totalTotalValue[0]["SUM(totalValue_cont_facturacion)"];
      setTotalTotalValue(temporal);
    }


  //filtra los datos de consulta
  async function getFiltroProveedores(){
    
    const queryParams = new URLSearchParams({
      id_calFacturacion: valorAFiltrar ,
      cliente_calFacturacion: valorAFiltrar,
      marcacion_calFacturacion: valorAFiltrar,
      pais_calFacturacion: valorAFiltrar,
      consignment_calFacturacion: valorAFiltrar,
      farmCode_calFacturacion: valorAFiltrar,
      date_calFacturacion: valorAFiltrar,
      incoterm_calFacturacion: valorAFiltrar,
      countryCode_calFacturacion: valorAFiltrar,
      mawb_calFacturacion: valorAFiltrar,
      hawb_calFacturacion: valorAFiltrar,
      airLine_calFacturacion: valorAFiltrar,
      currierFreight_calFacturacion: valorAFiltrar,
      ruc_calFacturacion: valorAFiltrar,
      noEmbarque_calFacturacion: valorAFiltrar,
      personInvoice_calFacturacion: valorAFiltrar,
      invoice_calFacturacion: valorAFiltrar,
      usdaOnly_calFacturacion: valorAFiltrar,
    });
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/facturacion_form_filtro?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    //en caso de no encontrar el elemento
    if (response.facturacion.length === 0) {
      alert("No se encontraron resultados de la busqueda, vuelve hacerlo");
    } else {
      setFacturaciones(response.facturacion);
    }
  }

  async function addFacturacion(){
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        marketingName_calFacturacion: valorMarketingName,
        cliente_calFacturacion:  valorCliente,
        marcacion_calFacturacion: valorMarcacion,
        pais_calFacturacion: valorPais,
        consignment_calFacturacion: valorConsignment,
        farmCode_calFacturacion: valorFarmCode,
        date_calFacturacion: valorDate,
        incoterm_calFacturacion: valorIncoterm,
        countryCode_calFacturacion: valorCountryCode,
        mawb_calFacturacion: valorMawb,
        hawb_calFacturacion: valorHawb,
        airLine_calFacturacion: valorAirLine,
        currierFreight_calFacturacion: valorCurrierFreight,
        ruc_calFacturacion: valorRuc,
        noEmbarque_calFacturacion: valorNoEmbarque,
        personInvoice_calFacturacion: valorPersonInvoice,
        invoice_calFacturacion: valorInvoice,
        usdaOnly_calFacturacion: valorUsdaOnly,
        comprador_calFacturacion: valorNombreFactura,
        numeroFactura_calFacturacion: valorNumeroFacturaGuardar,
        fecha_calFacturacion: queryFecha,
        hora_calFacturacion: queryHora,

      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/facturacion_formulario`,
      postData
    );
    const response = await res.json();
    if(response.response.message != "success") return;    
  }


  
  async function addContFacturacion(){
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picesType_cont_facturacion: valorPicesTypeContFacturacion,
        totalPices_cont_facturacion: valorTotalPices,
        eqFullBoxes_cont_facturacion: valorEqFullBoxesContFacturacion,
        productRosas_cont_facturacion: valorVariedades,
        longitud_cont_facturacion: valorLongitudIdContFacturacion,
        noBunches_cont_facturacion: valorNumeroBunches,
        Indicator_cont_facturacion: valorIndicatorContFacturacion,
        hts_cont_facturacion: valorHtsContFacturacion,
        nandina_cont_facturacion: valorNandinaContFacturacion,
        totalStems_cont_facturacion: valorTotalStemsIdContFacturacion,
        stemsPerBunch_cont_facturacion: valorStemsPerBunch,
        unitPrice_cont_facturacion: valorUnitPrice,
        totalValue_cont_facturacion: valorTotalContFacturacion,
        fecha_cont_facturacion: queryFecha,
        hora_cont_facturacion: queryHora
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/facturacion_contenido`,
      postData
    );
    const response = await res.json();
    if(response.response.message != "success") return;    
  }

  async function updateContFacturacion(){
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
            id_cont_Facturacion: valorIdContFacturacion,
            picesType_cont_facturacion: valorPicesTypeContFacturacion,
            totalPices_cont_facturacion:  valorTotalPices,
            eqFullBoxes_cont_facturacion: valorEqFullBoxesContFacturacion,
            productRosas_cont_facturacion: valorVariedades,
            longitud_cont_facturacion: valorLongitudIdContFacturacion,
            noBunches_cont_facturacion: valorNumeroBunches,
            Indicator_cont_facturacion: valorIndicatorContFacturacion,
            hts_cont_facturacion: valorHtsContFacturacion,
            nandina_cont_facturacion: valorNandinaContFacturacion,
            totalStems_cont_facturacion: valorTotalStemsIdContFacturacion,
            stemsPerBunch_cont_facturacion: valorStemsPerBunch,
            unitPrice_cont_facturacion: valorUnitPrice,
            totalValue_cont_facturacion: valorTotalContFacturacion
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/facturacion_contenido`,
      postData
    );
    const response = await res.json();
    console.log(response.response.facturacion);
    if(response.response.message != "success") return;
  }

  async function updateFacturacion(){
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_calFacturacion: JSON.stringify(parseInt(facturaciones[0]?.id_calFacturacion)),
        marketingName_calFacturacion: valorMarketingName,
        cliente_calFacturacion:  valorCliente,
        marcacion_calFacturacion: valorMarcacion,
        pais_calFacturacion: valorPais,
        consignment_calFacturacion: valorConsignment,
        farmCode_calFacturacion: valorFarmCode,
        date_calFacturacion: valorDate,
        incoterm_calFacturacion: valorIncoterm,
        countryCode_calFacturacion: valorCountryCode,
        mawb_calFacturacion: valorMawb,
        hawb_calFacturacion: valorHawb,
        airLine_calFacturacion: valorAirLine,
        currierFreight_calFacturacion: valorCurrierFreight,
        ruc_calFacturacion: valorRuc,
        noEmbarque_calFacturacion: valorNoEmbarque,
        personInvoice_calFacturacion: valorPersonInvoice,
        invoice_calFacturacion: valorInvoice,
        usdaOnly_calFacturacion: valorUsdaOnly,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/facturacion_formulario`,
      postData
    );
    const response = await res.json();
    console.log(response.response.facturacion);
    if(response.response.message != "success") return;
  }

  async function deleteContFacturacion() {
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_cont_Facturacion: valorBorrar,
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/facturacion_contenido`,
      postData
    );
    const response = await res.json();
    console.log(response.response.facturacion);
    if(response.response.message != "success") return;
  }

  async function deleteContFacturacionTodo() {
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha_cont_facturacion: queryFecha,
        hora_cont_facturacion: queryHora
      }),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/facturacion_contenido_vaciar`,
      postData
    );
    const response = await res.json();
    console.log(response.response.facturacion);
    if(response.response.message != "success") return;
  }

  useEffect(() => {
    document.title = "Modificar Factura"
    getPaises();
    getValueCargo();
  
    getFacturacion();
    getContFacturacion();
    getVariedad(); 
    
    actualizarTotales();

    getComprador();

    setShowModalCargaDatos(true);

  }, []);

  //inicializar variables para uso de la pagina
  function inicializarVariables(){
    setValorMarketingName(JSON.stringify(facturaciones[0]?.marketingName_calFacturacion).replace(/"/g, ''));
    setValorCliente(JSON.stringify(facturaciones[0]?.cliente_calFacturacion).replace(/"/g, ''));
    setValorMarcacion(JSON.stringify(facturaciones[0]?.marcacion_calFacturacion).replace(/"/g, ''));
    setValorPais(JSON.stringify(facturaciones[0]?.pais_calFacturacion).replace(/"/g, ''));
    setValorConsignment(JSON.stringify(facturaciones[0]?.consignment_calFacturacion).replace(/"/g, ''));
    setValorFarmCode(JSON.stringify(facturaciones[0]?.farmCode_calFacturacion).replace(/"/g, ''));
    setValorDate(JSON.stringify(facturaciones[0]?.date_calFacturacion).replace(/"/g, ''));
    setValorIncoterm(JSON.stringify(facturaciones[0]?.incoterm_calFacturacion).replace(/"/g, ''));
    setValorCountryCode(JSON.stringify(facturaciones[0]?.countryCode_calFacturacion).replace(/"/g, ''));
    setValorMawb(JSON.stringify(facturaciones[0]?.mawb_calFacturacion).replace(/"/g, ''));
    setValorHawb(JSON.stringify(facturaciones[0]?.hawb_calFacturacion).replace(/"/g, ''));
    setValorAirLine(JSON.stringify(facturaciones[0]?.airLine_calFacturacion).replace(/"/g, ''));
    setValorCurrierFreight(JSON.stringify(facturaciones[0]?.currierFreight_calFacturacion).replace(/"/g, ''));
    setValorRuc(JSON.stringify(facturaciones[0]?.ruc_calFacturacion).replace(/"/g, ''));
    setValorNoEmbarque(JSON.stringify(facturaciones[0]?.noEmbarque_calFacturacion).replace(/"/g, ''));
    setValorPersonInvoice(JSON.stringify(facturaciones[0]?.personInvoice_calFacturacion).replace(/"/g, ''));
    setValorInvoice(JSON.stringify(facturaciones[0]?.invoice_calFacturacion).replace(/"/g, ''));
    setValorUsdaOnly(JSON.stringify(facturaciones[0]?.usdaOnly_calFacturacion).replace(/"/g, ''));
  }


  //asignacion valor a filtrar
  const asignarValorAFiltrar = event => {
    setValorAFiltrar(event.target.value);
  }

  //asignacion variables de formulario
  const asignarIdFacturacion = event => {
    setValorMarketingName(event.target.value);
  }

  const asignarMarketingName = event => {
    setValorMarketingName(event.target.value);
  }

  const asignarCliente = event => {
    setValorCliente(event.target.value);
  }

  const asignarMarcacion = event => {
    setValorMarcacion(event.target.value);
  }

  const asignarPais = event => {
    setValorPais(event.target.value);
  }

  const asignarConsignment = event => {
    setValorConsignment(event.target.value);
  }

  const asignarFarmCode = event => {
    setValorFarmCode(event.target.value);
  }

  const asignarDate = event => {
    setValorDate(event.target.value);
  }

  const asignarIncoterm = event => {
    setValorIncoterm(event.target.value);
  }
  
  const asignarCountryCode = event => {
    setValorCountryCode(event.target.value);
  }
  
  const asignarMawb = event => {
    setValorMawb(event.target.value);
  }
  
  const asignarHawb = event => {
    setValorHawb(event.target.value);
  }
  
  const asignarAirLine = event => {
    setValorAirLine(event.target.value);
  }
  
  const asignarCurrierFreight = event => {
    setValorCurrierFreight(event.target.value);
  }
  
  const asignarRuc = event => {
    setValorRuc(event.target.value);
  }
  
  const asignarNoEmbarque = event => {
    setValorNoEmbarque(event.target.value);
  }
  
  const asignarPersonInvoice = event => {
    setValorPersonInvoice(event.target.value);
  }
   
  const asignarInvoice = event => {
    setValorInvoice(event.target.value);
  }
   
  const asignarUsdaOnly = event => {
    setValorUsdaOnly(event.target.value);
  }
   
  const asignarObservacionesFactura = event => {
    setValorObservacionesFactura(event.target.value);
  }

  
  //funcion para update, mostrar data por defecto
  async function asignarDataPorDefecto (id, picestype, totalpices, eqfull, productrosas, longitud, nobunches, indicator, hts, nandina, totalstems, stemsperbunch, unitprice, totalvalue,){
    setValorDefectoIdContFacturacion(id);
    setValorDefectoPicesTypeContFacturacion(picestype);
    setValorDefectoTotalPices(totalpices);
    setValorDefectoEqFullBoxesContFacturacion(eqfull);
    setValorDefectoVariedades(productrosas);
    setValorDefectoLongitudIdContFacturacion(longitud);
    setValorDefectoNumeroBunches(nobunches);
    setValorDefectoIndicatorContFacturacion(indicator);
    setValorDefectoHtsContFacturacion(hts);
    setValorDefectoNandinaContFacturacion(nandina);
    setValorDefectoTotalStemsIdContFacturacion(totalstems);
    setValorDefectoStemsPerBunch(stemsperbunch);
    setValorDefectoUnitPrice(unitprice);
    setValorDefectoTotalContFacturacion(totalvalue);

  }

  //resetear los valores de las variables

  async function resetearVariables(){
    setValorIdContFacturacion("");
    setValorPicesTypeContFacturacion("");
    setValorTotalPices("");
    setValorEqFullBoxesContFacturacion("");
    setValorVariedades("");
    setValorLongitudIdContFacturacion("");
    setValorNumeroBunches("");
    setValorIndicatorContFacturacion("");
    setValorHtsContFacturacion("");
    setValorNandinaContFacturacion("");
    setValorTotalStemsIdContFacturacion("");
    setValorStemsPerBunch("");
    setValorUnitPrice("");
    setValorTotalContFacturacion("");
  }

    //valor a borrar despues de click borrar
  async function asignarValorBorrar(id){
    setValorBorrar(id);
  }

  //activar filtro
  async function AccionActivarFiltro(event){
    event.preventDefault();
    await getFiltroProveedores();

  }
  //desactivar filtro
  async function AccionDesactivarFiltro(){
    setValorAFiltrar("");
    getProveedores();
  }

  ////////////////////////////////////////////
  

  //asignacion de contenido de factura

  //asignacion de valores por defecto para mostrar en placeholder


  
    //valores de calculo
  const asignarTotalPices = event => {
    setValorTotalPices(event.target.value);
  }

  const asignarEqFullBoxes = event => {
    let calculo = (event.target.value/2).toString();
    //hacer la conversion de number a string para evitar conflicto con database

    setValorEqFullBoxesContFacturacion(calculo);
  }

  const asignarNumeroBunches = event => {
    setValorNumeroBunches(event.target.value);
  }

  const asignarStemsPerBunch = event => {
    setValorStemsPerBunch(event.target.value);
  }

  const asignarUnitPrice = event => {
    setValorUnitPrice(event.target.value);
  }

    //valores de lectura

  const asignarId = event => {
    setValorIdContFacturacion(event.target.value);
  } 

  const asignarPicesType = event => {
    setValorPicesTypeContFacturacion(event.target.value);
  }

  const asignarVariedad = event => {
    setValorVariedades(event.target.value);
  }

  const asignarLongitud = event => {
    setValorLongitudIdContFacturacion(event.target.value);
  }

  const asignarIndicador = event => {
    setValorIndicatorContFacturacion(event.target.value);
  }

  const asignarHts = event => {
    setValorHtsContFacturacion(event.target.value);
  }

  const asignarNandina = event => {
    setValorNandinaContFacturacion(event.target.value);
  }

  const asignarTotalStems = (event, opcionOperacion) => {
    //el valor por el que se multiplica el evento debe ser el otro valor, cambia ese valor
    //controlar id para hacer una u otra operacion con variables distintas
    let calculo;
    if(opcionOperacion == 1){
      calculo = (event.target.value*valorStemsPerBunch).toString();
    }else if (opcionOperacion == 2){
      calculo = (event.target.value*valorNumeroBunches).toString();
    }
    
    setValorTotalStemsIdContFacturacion(calculo);
  }

  const asignarValorTotal = event => {
    let calculo = (event.target.value * valorTotalStemsIdContFacturacion).toString();
    setValorTotalContFacturacion(calculo);
  }

  /*const reAsignarValorTotal = event => {
    let calculo = valorUnitPrice*valorTotalStemsIdContFacturacion;
    setValorTotalContFacturacion(calculo);
  }*/


  //se debe crear una constante por cada input porque se necesita siempre de 
  //un valor event para poder realizar operaciones
  //cuando un input depende solo de un evento se manda directamente el valor y se realizar operaciones
  //pero cuando se tienen varios eventos, se realizar una operacion completa en otra constante
  //y se vuelve a asignar, se pasa desde donde se quiere realizar la accion un valor tipo opcion
  //que indica que operacion realizar, es decir que valor ira a usar
  //ignorando del que se esta tomando el valor event
  //no existe una tercera operacion porque el total ya esta enlazado con el precio unitario
  const reAsignarValorTotal = (event, opcionOperacion) => {
    let calculo;
    if(opcionOperacion == 1){
      calculo = event.target.value*valorStemsPerBunch*valorUnitPrice
    }else if (opcionOperacion == 2){
      calculo = event.target.value*valorNumeroBunches*valorUnitPrice;
    }

    setValorTotalContFacturacion(calculo);
  }

  //actualizar los totales
  function actualizarTotales () {
    getTotalPices();
    getTotalEqFull();
    getTotalTotalValue();
  }

      //conseguir data sobre comprador 
      async function getComprador(){
        const postData = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comprador`,
        postData);
        const response = await res.json();
        setComprador(response.comprador);
      }

      const opcionesComprador = comprador.map((vard) => ({
        value: vard.nombre_comp,
        label: vard.nombre_comp
      }));

      //conseguir data sobre el id actual de la ultima factura de comprador 
      async function getNumeroUltimaFactura(event){

        setValorNombreFactura(event.target.value);


        if (event.target.value == "") {
          // Mostrar mensaje de alerta
          alert("Seleccione un comprador");
          return;
        }else{
          const queryParams = new URLSearchParams({
            compradorNombre : event.target.value,
          }
          );
  
          const res =await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/numero_factura?${queryParams.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const response =await res.json();
          setValorNumeroFactura(response.numeroFactura);
          setValorNumeroFacturaGuardar(JSON.stringify(valorNumeroFactura[0]?.id_calFacturacion));


        }
          
                     
      }


  //seccion codigo de modal insertar
  const htmlInsertar = 
  <div className='w-full p-8 relative overflow-x-auto sm:rounded-lg'>

    <table className='sm:rounded-lg w-full text-sm text-left '>
      <thead className='text-gray-700 uppercase bg-orange-400'>
                      <tr>
                        <th scope="col" className="text-center px-5 py-3 text-xl">PICES TYPE</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">TOTAL PICES</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">EQ. FULL BOXES</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">PRODUCT ROSAS</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">LONGITUD</th>
                        <th scope="col" className="text-center px-15 py-3 text-xl"># BUNCHES</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">INDICATOR</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">HTS</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">NANDINA</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">TOTAL STEMS</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">STEMS/BUNCH</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">UNIT PRICE</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">TOTAL VALUE USD.</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white" >
                          <td className='text-center text-lg'>
                          <select value={valorPicesTypeContFacturacion} onChange={asignarPicesType} class="w-20 h-20 bg-emerald-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                              <option selected></option>
                              <option value="FB">FB</option>
                              <option value="HB">HB</option>
                              <option value="QB">QB</option>
                            </select>
                          </td>
                          <td className='text-center text-lg'>
                            <input value={valorTotalPices} onChange ={(event) => { asignarTotalPices(event); asignarEqFullBoxes(event)}} className='w-20 h-20 text-center bg-emerald-200 rounded-lg' ></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input value={valorEqFullBoxesContFacturacion} className='w-20 h-20 text-center rounded-lg'></input>
                          </td>
                          <td className='text-center text-lg'>
                            <select value={valorVariedades} onChange={asignarVariedad} class="w-20 h-20 bg-emerald-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                              <option selected>Escoja la Variedad</option>
                              {opcionesVariedad.map((opcion) => (
                                <option value={opcion.value}>{opcion.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className='text-center text-lg'>
                            <select value={valorLongitudIdContFacturacion} onChange={asignarLongitud} class="w-20 h-20 bg-emerald-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                              <option selected>Escoja la longitud</option>
                              <option value="40 cm">40 cm</option>
                              <option value="50 cm">50 cm</option>
                              <option value="60 cm">60 cm</option>
                              <option value="70 cm">70 cm</option>
                              <option value="80 cm">80 cm</option>
                              <option value="90 cm">90 cm</option>
                              <option value="100 cm">100 cm</option>
                            </select>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorNumeroBunches} onChange={(event) => {asignarNumeroBunches(event); asignarTotalStems(event, 1); reAsignarValorTotal(event, 1)}}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorIndicatorContFacturacion} onChange={asignarIndicador}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorHtsContFacturacion} onChange={asignarHts}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorNandinaContFacturacion} onChange={asignarNandina}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center rounded-lg' value={valorTotalStemsIdContFacturacion}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorStemsPerBunch} onChange={(event) => {asignarStemsPerBunch(event); asignarTotalStems(event, 2); reAsignarValorTotal(event, 2)}}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorUnitPrice} onChange={ (event) => {asignarUnitPrice(event); asignarValorTotal(event)}}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorTotalContFacturacion} ></input>
                          </td>
                        </tr>



                      </tbody>
    </table>
  </div>
  ;


  //seccion codigo de modal insertar
  const htmlActualizar = 
  <div className='w-full p-8 relative overflow-x-auto sm:rounded-lg'>

    <table className='sm:rounded-lg w-full text-sm text-left '>
      <thead className='text-gray-700 uppercase bg-orange-400 '>
                      <tr>
                        <th scope="col" className="text-center px-5 py-3 text-xl">ID</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">PICES TYPE</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">TOTAL PICES</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">EQ. FULL BOXES</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">PRODUCT ROSAS</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">LONGITUD</th>
                        <th scope="col" className="text-center px-15 py-3 text-xl"># BUNCHES</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">INDICATOR</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">HTS</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">NANDINA</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">TOTAL STEMS</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">STEMS/BUNCH</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">UNIT PRICE</th>
                        <th scope="col" className="text-center px-5 py-3 text-xl">TOTAL VALUE USD.</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white" >
                          <td className='text-center text-lg'>
                            <input value={valorIdContFacturacion} onChange ={(event) => { asignarId(event)}} className='w-20 h-20 text-center bg-emerald-200 rounded-lg' placeholder = {valorDefectoIdContFacturacion}></input>
                          </td>
                          <td className='text-center text-lg'>
                          <select value={valorPicesTypeContFacturacion} onChange={asignarPicesType} class="w-20 h-20 bg-emerald-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " >
                              <option selected>**{valorDefectoPicesTypeContFacturacion}**</option>
                              <option value="FB">FB</option>
                              <option value="HB">HB</option>
                              <option value="QB">QB</option>
                            </select>
                          </td>
                          <td className='text-center text-lg'>
                            <input value={valorTotalPices} onChange ={(event) => { asignarTotalPices(event); asignarEqFullBoxes(event)}} className='w-20 h-20 text-center bg-emerald-200 rounded-lg' placeholder = {valorDefectoTotalPices} ></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input value={valorEqFullBoxesContFacturacion} className='w-20 h-20 text-center rounded-lg' placeholder={valorDefectoEqFullBoxesContFacturacion}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <select value={valorVariedades} onChange={asignarVariedad} class="w-20 h-20 bg-emerald-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                              <option selected>**{valorDefectoVariedades}**</option>
                              {opcionesVariedad.map((opcion) => (
                                <option value={opcion.value}>{opcion.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className='text-center text-lg'>
                            <select value={valorLongitudIdContFacturacion} onChange={asignarLongitud} class="w-20 h-20 bg-emerald-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                              <option selected>**{valorDefectoLongitudIdContFacturacion}**</option>
                              <option value="40 cm">40 cm</option>
                              <option value="50 cm">50 cm</option>
                              <option value="60 cm">60 cm</option>
                              <option value="70 cm">70 cm</option>
                              <option value="80 cm">80 cm</option>
                              <option value="90 cm">90 cm</option>
                              <option value="100 cm">100 cm</option>
                            </select>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorNumeroBunches} onChange={(event) => {asignarNumeroBunches(event); asignarTotalStems(event, 1); reAsignarValorTotal(event, 1)}} placeholder={valorDefectoNumeroBunches}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorIndicatorContFacturacion} onChange={asignarIndicador} placeholder={valorDefectoIndicatorContFacturacion}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorHtsContFacturacion} onChange={asignarHts} placeholder={valorDefectoHtsContFacturacion}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorNandinaContFacturacion} onChange={asignarNandina} placeholder={valorDefectoNandinaContFacturacion}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center rounded-lg' value={valorTotalStemsIdContFacturacion} placeholder={valorDefectoTotalStemsIdContFacturacion}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorStemsPerBunch} onChange={(event) => {asignarStemsPerBunch(event); asignarTotalStems(event, 2); reAsignarValorTotal(event, 2)}} placeholder={valorDefectoStemsPerBunch}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorUnitPrice} onChange={ (event) => {asignarUnitPrice(event); asignarValorTotal(event)}} placeholder={valorDefectoUnitPrice}></input>
                          </td>
                          <td className='text-center text-lg'>
                            <input className='w-20 h-20 text-center bg-emerald-200 rounded-lg' value={valorTotalContFacturacion} placeholder={valorDefectoTotalContFacturacion} ></input>
                          </td>
                        </tr>



                      </tbody>
    </table>
  </div>
  ;


  return (
    <Fragment>
      <BarraFlotante></BarraFlotante>
      
      <div className=''>
              <button onClick={() => {router.back()}} className="mt-6 mx-8 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-500 rounded-md group-hover:bg-opacity-0 font-black">
                  REGRESAR
                </span>
              </button>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-500 rounded-md group-hover:bg-opacity-0 font-black">
                  Modificar Factura
                </span>
              <div>
                <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
                  <div class="grid h-full min-w-screen max-w-lg grid-cols-2 mx-auto font-medium">
                      <button onClick={()=> {setEstadoPrimeraSeccion(true);setEstadoSegundaSeccion(false);setEstadoTerceraSeccion(false)}} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ">
                          <svg class="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                          </svg>
                          <span class="text-sm text-gray-500  group-hover:text-blue-600 ">Paso 1</span>
                      </button>
                      <button onClick={()=> {setShowModalAdvertenciaGuardado(true); setEstadoPrimeraSeccion(false);setEstadoSegundaSeccion(true);setEstadoTerceraSeccion(false)}} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ">
                          <svg className='w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600 ' fill="none" stroke="currentColor" stroke-width="0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"></path>
                          </svg>
                          <span class="text-sm text-gray-500 group-hover:text-blue-600 ">Paso 2</span>
                      </button>
                      
                  </div>
                </div>
              </div>

        <div suppressHydrationWarning className='flex flex-col lg:flex-row'>
          <div suppressHydrationWarning className='p-6'>
            <span className='p-2'>
            FECHA:
              </span>
            {queryFecha}
          </div>
          <div suppressHydrationWarning className='p-6'>
            <span className='p-2'>
            HORA:
              </span> 
            {queryHora}
          </div>
        </div>

    {estadoPrimeraSeccion && 
    <div className='w-full'>
      <div className='w-full flex flex-col text-xl items-center bg-green-100 rounded-lg'    >
        {/*seccion titulo*/}
        <div className='p-6 flex flex-col sm:flex-row space-x-7'>
            <h5 className='align-middle p-5 text-4xl font-bold'>COMERCIAL</h5>
            <input className='text-center' value={compradorBusquedaFactura}></input>
            <input className='text-center rounded-sm border-emerald-400 border-8' value={JSON.stringify(parseInt(facturaciones[0]?.id_calFacturacion))}></input>
            <button onClick={() => {inicializarVariables()}} className="mt-6 mx-8 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 ">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-500 rounded-md group-hover:bg-opacity-0 font-black">
                  REESTABLECER DATOS
                </span>
              </button>
        </div>
        {/*seccion cabecera*/}
        <div className='flex flex-col-2 mb-12'>
          <div className='w-1/2 p-2 sm:p-7'>
            <label for="first_name" class="block text-sm font-medium text-gray-900 ">Shipper Name and Address</label>
            <a class="flex flex-col sm:flex-row items-center mb-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-xs font-bold tracking-tight text-gray-900 ">GP FLOWERS/MARIN CHACON PATRICIA</h5>
                    <div>
                      <h5 class="mb-2 text-xs font-bold tracking-tight text-gray-900 ">Cotopaxi-Ecuador</h5>
                      <h5 class="mb-2 text-xs tracking-tight text-gray-900 ">Phone: (593) 984342413</h5>
                    </div>                  
                    <p class="mb-2 text-xs tracking-tight text-gray-900 ">e_mail: paty_gpflowers@hotmail.com</p>
                </div>
                <img class="w-1/2 rounded-t-lg  md:rounded-none md:rounded-l-lg" src={'../assets/images/gp_flowers.jpg'} alt=""/>
            </a>
            <label for="first_name" class="block text-sm font-medium text-gray-900 ">Marketing Name</label>
            <input value={valorMarketingName} onChange={(event) => {asignarMarketingName(event)}} type="text" id="first_name" className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={valorMarketingName} required/>
            <label for="first_name" class="block text-sm font-medium text-gray-900 ">Consignee Name and Address</label>
            <a class="flex flex-col p-6 bg-white border border-gray-200 shadow md:max-w-xl ">
                <div class="flex flex-col lg:flex-row items-center justify-between pb-4 leading-normal">
                    <label for="first_name" class="block text-sm font-medium text-gray-900 ">CLIENTE:</label>
                    <input value={valorCliente} onChange={(event) => {asignarCliente(event)}} type="text" id="last_name" class="bg-gray-50 w-4/5 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required/>
                </div>
                <div class="flex flex-col lg:flex-row items-center justify-between pb-4 leading-normal">
                    <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-black">MARCACION:</label>
                    <input value={valorMarcacion} onChange={(event) => {asignarMarcacion(event)}} type="text" id="last_name" class="bg-gray-50 w-4/7 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required/>
                </div>
                <div class="flex flex-col justify-between leading-normal">
                    <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-white">País</label>
                    <div>
                      <select value={valorPais} onChange={(event) => {asignarPais(event)}} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                          <option selected>{valorPais}</option>
                          {opcionesPaises.map((opcion) => (
                            <option value={opcion.value}>{opcion.label}</option>
                          ))}
                      </select>
                    </div>
                </div>
            </a>
            <div className='flex flex-row items-center pt-6'>
                    <div className='flex flex-col w-1/7 mr-6 items-center'>
                      <label for="last_name" class="block text-sm font-medium text-gray-900 ">Consignment</label>  
                    </div>
                    <div className='flex flex-col w-2/5 items-center'>
                      <input value={valorConsignment} onChange={(event) => {asignarConsignment(event)}} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required/>
                    </div>
            </div>
          </div>
          <div>
              <div class="grid mb-6 md:grid-cols-2">
                <div>
                    <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-white">Farm Code</label>
                    <input value={valorFarmCode} onChange={(event) => {asignarFarmCode(event)}} type="text" id="first_name" class="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="GP" required/>
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">Date</label>
                    <input value={valorDate} onChange={(event) => {asignarDate(event)}} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="23/02/2022" required/>
                </div>
                <div>
                    <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-white">INCOTERM</label>
                    <input value={valorIncoterm} onChange={(event) => {asignarIncoterm(event)}} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="FCA-UIO" required/>
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">Country Code</label>
                    <input value={valorCountryCode} onChange={(event) => {asignarCountryCode(event)}} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="EC" required/>
                </div>
              </div>
              <div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">MAWB No.</label>
                    <input value={valorMawb} onChange={(event) => {asignarMawb(event)}} type="text" id="last_name" class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="14509595784" required/>
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">HAWB</label>
                    <input value={valorHawb} onChange={(event) => {asignarHawb(event)}} type="text" id="last_name" class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="893896" required/>
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">Air Line</label>
                    <input value={valorAirLine} onChange={(event) => {asignarAirLine(event)}} type="text" id="last_name" class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required/>
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">Currier & Freight Forwarder</label>
                    <div className='mb-6'>
                      <select value={valorCurrierFreight} onChange={(event) => {asignarCurrierFreight(event)}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                          <option selected>{valorCurrierFreight}</option>
                          {opcionesValueCargo.map((opcionCargo) => (
                            <option value={opcionCargo.valueCargo}>{opcionCargo.labelCargo}</option>
                          ))}
                      </select>
                    </div>
                </div>
              </div>
              <div class="grid md:grid-cols-2">
                <div>
                    <label for="first_name" class="block text-sm font-medium text-gray-900 ">R.U.C. No.</label>
                    <input value={valorRuc} onChange={(event) => {asignarRuc(event)}} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0502401011001" required/>
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 ">No EMBARQUE</label>
                    <input value={valorNoEmbarque} onChange={(event) => {asignarNoEmbarque(event)}} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
                </div>
                <label for="last_name" class="block text-sm font-medium text-gray-900 ">DAE No.005-2023-40-00139723</label>
              </div>    
          </div>
        </div>


{/*seccion pie*/}
        <div className=''>
                <div className=''>
                    <label for="last_name" class=" text-sm font-medium text-gray-900 ">Name and Title of person Preparing Invoice</label>
                    <input value={valorPersonInvoice} onChange={(event) => {asignarPersonInvoice(event)}} type="text" id="last_name" class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required/>
                </div>
        </div>
        <div className='flex flex-col-2'>
                <div className='p-2 w-1/2 lg:p-12 lg:w-1/2'>
                    <input value={valorInvoice} onChange={(event) => {asignarInvoice(event)}} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required/>
                    <label for="last_name" class="bg-rose-300 border-black border-2 pl-12 block text-sm font-medium text-gray-900 dark:text-white">CUSTOM USE ONLY</label>
                    <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">The flowers and plants on this invoice where wholly grown in ECUADOR</label>
                </div>
                <div className='p-2 w-1/2 lg:p-12 lg:w-1/2'>
                    <input value={valorUsdaOnly} onChange={(event) => {asignarUsdaOnly(event)}} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required/>
                    <label for="last_name" class="bg-rose-300 border-black border-2 pl-12 block text-sm font-medium text-gray-900 ">USDA, APHIS, P.P.Q. Use Only</label>
                </div>
        </div>
        <div className='m-12 p-12'>
                    <button onClick={() => {setShowModalConfirmarActualizar(true)}}  class="m-12 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-3xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 ">
                      <span class="relative px-5 py-3 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          ACTUALIZAR
                      </span>
                    </button>            
                </div>
        
      </div>

    </div>
    }
    {/*///////////////////////////////////////*/}

    
    {estadoSegundaSeccion &&
    <div className='w-full p-12  bg-gradient-to-r from-lime-300 to-cyan-300'>

<div className=''>
            <button type="button" className="ml-8 py-2.5 px-5 mr-12 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                  onClick={() => {setShowModal(true); resetearVariables()}}>AGREGAR NUEVO</button>
            <button className='bg-blue-400 ml-12 py-1 px-4 mr-2 mb-2' onClick={getContFacturacion}>
              <div className='flex flex-row space-x-4'>
                  <a>
                    Actualizar
                  </a>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
            </button>
        </div>
                <div className='w-full p-1 relative overflow-x-auto sm:rounded-lg '>
                  <table className="overflowY: 'auto' scroll-smooth w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="text-center px-6 py-3 text-xl">ID</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">PICES TYPE</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL PICES</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">EQ. FULL BOXES</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">PRODUCT ROSAS</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">LONGITUD</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">No. BUNCHES</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">INDICATOR</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">HTS</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">NANDINA</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL STEMS</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">STEMS / BUNCH</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">UNIT PRICE</th>
                        <th scope="col" className="text-center px-6 py-3 text-xl">TOTAL VALUE</th>
                        <th scope="col" className="px-6 py-3"> <span className="sr-only">EDITAR</span> </th>
                        <th scope="col" className="px-6 py-3"> <span className="sr-only">ELIMINAR</span> </th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {valueContFacturaciones.map((contFacturaciones) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" key={contFacturaciones.id_cont_facturacion}>
                          <td className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>{contFacturaciones.id_cont_facturacion}
                          </td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white'>{contFacturaciones.picesType_cont_facturacion}
                          </td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white'>{contFacturaciones.totalPices_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.eqFullBoxes_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.productRosas_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.longitud_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.noBunches_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.Indicator_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.hts_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.nandina_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.totalStems_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.stemsPerBunch_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.unitPrice_cont_facturacion}</td>
                          <td className='px-6 py-4  text-center font-medium whitespace-nowrap dark:text-white '>{contFacturaciones.totalValue_cont_facturacion}</td>



                          <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <a href="#" className="font-medium text-blue-600 hover:underline" 
                              onClick={() =>{
                                setShowModalEditar(true);
                                asignarDataPorDefecto(
                                  contFacturaciones.id_cont_facturacion, 
                                  contFacturaciones.picesType_cont_facturacion,
                                  contFacturaciones.totalPices_cont_facturacion,
                                  contFacturaciones.eqFullBoxes_cont_facturacion,
                                  contFacturaciones.productRosas_cont_facturacion,
                                  contFacturaciones.longitud_cont_facturacion,
                                  contFacturaciones.noBunches_cont_facturacion,
                                  contFacturaciones.Indicator_cont_facturacion,
                                  contFacturaciones.hts_cont_facturacion,
                                  contFacturaciones.nandina_cont_facturacion,
                                  contFacturaciones.totalStems_cont_facturacion,
                                  contFacturaciones.stemsPerBunch_cont_facturacion,
                                  contFacturaciones.unitPrice_cont_facturacion,
                                  contFacturaciones.totalValue_cont_facturacion
                                  );
                                  resetearVariables();
                                  }}
                                  >EDITAR</a></td>
                          <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {setShowModalEliminar(true); asignarValorBorrar(contFacturaciones.id_cont_facturacion);}}>ELIMINAR</a> </td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <input className='text-black text-center text-lg rounded py-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600' value={totalTotalPices}></input>
                        </td>
                        <td>
                          <input className='text-black text-center text-lg rounded py-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600' value={totalEqFull}></input>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                        <td>
                          <input className='text-black text-center text-lg rounded py-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600' value={totalTotalValue}></input>
                        </td>
                      </tr>
                      
                    </tbody>

                  </table>

                </div>
                      
                <div className='mb-12'>
                <button onClick={() => {setShowModalVaciarTabla(true)}} className="mt-6 mx-8 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-500 rounded-md group-hover:bg-opacity-0 font-black">
                  VACIAR CONTENIDO
                </span>
              </button>
                </div>


                    
    </div >}


    {
      estadoTerceraSeccion &&
      <div>
        
        
      </div>
    }

    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
              <div>
                <div>
                  <p>{htmlInsertar}</p>
                </div>
                <div>
                  <button onClick={() => {addContFacturacion(); getContFacturacion() ; setShowModal(false); actualizarTotales() }} type="button" className="ml-8 py-2.5 px-5 mr-2 mb-2 mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-emerald-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >GUARDAR
                  </button>
                </div>
              </div>
    </Modal>
    <Modal isVisible={showModalEditar} onClose={() => setShowModalEditar(false)}>
    <div>
              <div>
                  <p>{htmlActualizar}</p>
                </div>
                <div>
                  <button onClick={() => {updateContFacturacion(); getContFacturacion(); setShowModalEditar(false); actualizarTotales() }} type="button" className="ml-8 py-2.5 px-5 mr-2 mb-2 mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-emerald-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >ACTUALIZAR
                  </button>
                </div>
              </div>
    </Modal>
    <Modal isVisible={showModalEliminar} onClose={() => setShowModalEliminar(false)}>
      <div className='flex items-center flex-col'>
        ¿Desea eliminar el elemento seleccionado?

        <button onClick={() => {deleteContFacturacion(); getContFacturacion(); setShowModalEliminar(false); actualizarTotales() }} type="button" className="ml-8 py-2.5 px-5 mr-2 mb-2 mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >Confirmar</button>
      </div>
    </Modal>
    <Modal isVisible={showModalVaciarTabla} onClose={() => setShowModalVaciarTabla(false)}>
      <div className='flex items-center flex-col'>
        ¿Desea eliminar el contenido de la tabla?

        <button onClick={() => { deleteContFacturacionTodo(); getContFacturacion(); setShowModalVaciarTabla(false) }} type="button" className="ml-8 py-2.5 px-5 mr-2 mb-2 mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >Confirmar</button>
      </div>
    </Modal>
    <Modal isVisible={showModalAdvertenciaGuardado} onClose={() => setShowModalAdvertenciaGuardado(false)}>
      <div className='flex items-center flex-col'>
        <div className='flex flex-row space-x-4'>
          <a>La tabla posee autoguardado</a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div className='flex flex-row space-x-4'>
        <a>Si la información no se muesta correctamente, usar el boton "actualizar"</a>
        </div>
        <button onClick={() => { setShowModalAdvertenciaGuardado(false) }} type="button" className=" py-2.5 px-5 mb-2 mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >OK</button>
      </div>
    </Modal>
    <Modal isVisible={showModalConfirmarActualizar} onClose={() => setShowModalConfirmarActualizar(false)}>
      <div className='flex items-center flex-col'>
        <div className='flex flex-row space-x-4'>
          <a>Desea actualizar la información?</a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <button onClick={() => { updateFacturacion(); router.back() ; window.alert("Modificación exitosa") }} type="button" className=" py-2.5 px-5 mb-2 mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >Si quiero</button>
      </div>
    </Modal>
    <Modal isVisible={showModalCargaDatos} onClose={() => setShowModalCargaDatos(false)}>
      <div className='flex items-center flex-col'>
        <div className='flex flex-row space-x-4'>
          <a>Cargue la información.</a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <button onClick={() => {inicializarVariables(); setShowModalCargaDatos(false)}} className="mt-6 mx-8 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 ">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-500 rounded-md group-hover:bg-opacity-0 font-black">
                  CARGAR DATOS
                </span>
        </button>
      </div>
    </Modal>

      </div>
      
              
    
    

    

    </Fragment>
    
    
  );

};

export default Facturacion;