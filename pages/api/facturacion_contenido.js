import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const {fecha_cont_facturacion, hora_cont_facturacion} = req.query;

    if(req.method === "GET"){

        const contFacturacion = await query(
            {
                query: "SELECT * FROM cont_facturacion WHERE fecha_cont_facturacion=? AND hora_cont_facturacion=? ",
                values: ([fecha_cont_facturacion, hora_cont_facturacion]),
            }
        );
        res.status(200).json({contFacturacion: contFacturacion});
    }

    
    /*
    if(req.method === "POST"){
        const PicesTypeContFacturacion = req.body.picesType_cont_facturacion;
        const TotalPicesContFacturacion = req.body.totalPices_cont_facturacion;
        const EqFullBoxesContFacturacion = req.body.eqFullBoxes_cont_facturacion;
        const ProductRosasContFacturacion = req.body.productRosas_cont_facturacion;
        const LongitudContFacturacion = req.body.longitud_cont_facturacion;
        const NoBunchesContFacturacion = req.body.noBunches_cont_facturacion;
        const IndicatorContFacturacion = req.body.indicator_cont_facturacion;
        const HtsContFacturacion = req.body.hts_cont_facturacion;
        const NandinaContFacturacion = req.body.nandina_cont_facturacion;
        const TotalStemsContFacturacion = req.body.totalStems_cont_facturacion;
        const StemsPerBunchContFacturacion = req.body.stemsPerBunch_cont_facturacion;
        const UnitPriceContFacturacion = req.body.unitPrice_cont_facturacion;
        const TotalValueContFacturacion = req.body.totalValue_cont_facturacion;
        

        const addContFacturacion = await query({
            query: "INSERT INTO cont_facturacion (picesType_cont_facturacion, totalPices_cont_facturacion, eqFullBoxes_cont_facturacion, productRosas_cont_facturacion, longitud_cont_facturacion, noBunches_cont_facturacion, indicator_cont_facturacion , hts_cont_facturacion, nandina_cont_facturacion, totalStems_cont_facturacion, stemsPerBunch_cont_facturacion, unitPrice_cont_facturacion, totalValue_cont_facturacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",              
            values: ([PicesTypeContFacturacion,
                TotalPicesContFacturacion,
                EqFullBoxesContFacturacion,
                ProductRosasContFacturacion,
                LongitudContFacturacion,
                NoBunchesContFacturacion,
                IndicatorContFacturacion,
                HtsContFacturacion,
                NandinaContFacturacion,
                TotalStemsContFacturacion,
                StemsPerBunchContFacturacion,
                UnitPriceContFacturacion,
                TotalValueContFacturacion
            ]),
        });

        if(addContFacturacion.insertId){
            message = "success";
        } else {
            message = "error";
        }
        let proveedor = {
            //id_proveedor: addProveedor.insertId,
            id_proveedor: addProveedor.insertId,
            cedula_proveedor: cedulaProveedor,
            nombre_proveedor: nombreProveedor,
            telefono_proveedor: telefonoProveedor,
            observaciones_proveedor: observacionesProveedor,  
        };
        res.status(200).json({response: {message: message, proveedor: addContFacturacion}});
    }
    */

    if(req.method === "POST"){

        const PicesTypeContFacturacion = req.body.picesType_cont_facturacion;
        const TotalPicesContFacturacion = req.body.totalPices_cont_facturacion;
        const EqFullBoxesContFacturacion = req.body.eqFullBoxes_cont_facturacion;
        const ProductRosasContFacturacion = req.body.productRosas_cont_facturacion;
        const LongitudContFacturacion = req.body.longitud_cont_facturacion;
        const NoBunchesContFacturacion = req.body.noBunches_cont_facturacion;
        const IndicatorContFacturacion = req.body.Indicator_cont_facturacion;
        const HtsContFacturacion = req.body.hts_cont_facturacion;
        const NandinaContFacturacion = req.body.nandina_cont_facturacion;
        const TotalStemsContFacturacion = req.body.totalStems_cont_facturacion;
        const StemsPerBunchContFacturacion = req.body.stemsPerBunch_cont_facturacion;
        const UnitPriceContFacturacion = req.body.unitPrice_cont_facturacion;
        const TotalValueContFacturacion = req.body.totalValue_cont_facturacion;
        const fechaContFacturacion = req.body.fecha_cont_facturacion;
        const horaContFacturacion = req.body.hora_cont_facturacion;

        
        const addContFacturacion = await query({
            query: "INSERT INTO cont_facturacion (picesType_cont_facturacion, totalPices_cont_facturacion, eqFullBoxes_cont_facturacion, productRosas_cont_facturacion, longitud_cont_facturacion, noBunches_cont_facturacion, Indicator_cont_facturacion, hts_cont_facturacion, nandina_cont_facturacion, totalStems_cont_facturacion, stemsPerBunch_cont_facturacion, unitPrice_cont_facturacion, totalValue_cont_facturacion, fecha_cont_facturacion, hora_cont_facturacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",              
            values: ([PicesTypeContFacturacion,
                TotalPicesContFacturacion,
                EqFullBoxesContFacturacion,
                ProductRosasContFacturacion,
                LongitudContFacturacion,
                NoBunchesContFacturacion,
                IndicatorContFacturacion,
                HtsContFacturacion,
                NandinaContFacturacion,
                TotalStemsContFacturacion,
                StemsPerBunchContFacturacion,
                UnitPriceContFacturacion,
                TotalValueContFacturacion,
                fechaContFacturacion,
                horaContFacturacion
            ]),
        });

        if(addContFacturacion.insertId){
            message = "success";
        } else {
            message = "error";
        }
        res.status(200).json({response: {message: message, factu: addContFacturacion}});
    }

    if(req.method === "PUT"){

        const idContFacturacion = req.body.id_cont_Facturacion;
        const PicesTypeContFacturacion = req.body.picesType_cont_facturacion;
        const TotalPicesContFacturacion = req.body.totalPices_cont_facturacion;
        const EqFullBoxesContFacturacion = req.body.eqFullBoxes_cont_facturacion;
        const ProductRosasContFacturacion = req.body.productRosas_cont_facturacion;
        const LongitudContFacturacion = req.body.longitud_cont_facturacion;
        const NoBunchesContFacturacion = req.body.noBunches_cont_facturacion;
        const IndicatorContFacturacion = req.body.Indicator_cont_facturacion;
        const HtsContFacturacion = req.body.hts_cont_facturacion;
        const NandinaContFacturacion = req.body.nandina_cont_facturacion;
        const TotalStemsContFacturacion = req.body.totalStems_cont_facturacion;
        const StemsPerBunchContFacturacion = req.body.stemsPerBunch_cont_facturacion;
        const UnitPriceContFacturacion = req.body.unitPrice_cont_facturacion;
        const TotalValueContFacturacion = req.body.totalValue_cont_facturacion;



        const updateFacturacion = await query({

            query: "UPDATE cont_facturacion SET picesType_cont_facturacion=?, totalPices_cont_facturacion=?, eqFullBoxes_cont_facturacion=?, productRosas_cont_facturacion=?, longitud_cont_facturacion=?, noBunches_cont_facturacion=?, Indicator_cont_facturacion=?, hts_cont_facturacion=?, nandina_cont_facturacion=?, totalStems_cont_facturacion=?, stemsPerBunch_cont_facturacion=?, unitPrice_cont_facturacion=?, totalValue_cont_facturacion=?  WHERE id_cont_Facturacion=?",
            values: ([PicesTypeContFacturacion,
                TotalPicesContFacturacion,
                EqFullBoxesContFacturacion,
                ProductRosasContFacturacion, 
                LongitudContFacturacion, 
                NoBunchesContFacturacion, 
                IndicatorContFacturacion, 
                HtsContFacturacion, 
                NandinaContFacturacion, 
                TotalStemsContFacturacion, 
                StemsPerBunchContFacturacion, 
                UnitPriceContFacturacion, 
                TotalValueContFacturacion,
                idContFacturacion ]),
                         
        });

        //indicar varias constantes para la actualizacion de variables mediante query,
        //primero revisar el tutorial para ver si realmente funciona
        
        const result = updateFacturacion.affectedRows;
        if(result){
            message = "success";
        } else {
            message = "error";
        }
        let facturacion = {
            id_cont_Facturacion: idContFacturacion,
            picesType_cont_facturacion: PicesTypeContFacturacion,
            totalPices_cont_facturacion:  TotalPicesContFacturacion,
            eqFullBoxes_cont_facturacion: EqFullBoxesContFacturacion,
            productRosas_cont_facturacion: ProductRosasContFacturacion,
            longitud_cont_facturacion: LongitudContFacturacion,
            noBunches_cont_facturacion: NoBunchesContFacturacion,
            Indicator_cont_facturacion: IndicatorContFacturacion,
            hts_cont_facturacion: HtsContFacturacion,
            nandina_cont_facturacion: NandinaContFacturacion,
            totalStems_cont_facturacion: TotalStemsContFacturacion,
            stemsPerBunch_cont_facturacion: StemsPerBunchContFacturacion,
            unitPrice_cont_facturacion: UnitPriceContFacturacion,
            totalValue_cont_facturacion: TotalValueContFacturacion
        };
        res.status(200).json({response: {message: message, facturacion: facturacion}});
    }
    

    if (req.method === "DELETE") {
        const idContFacturacion = req.body.id_cont_Facturacion;
        const deleteContFacturacion = await query({
          query: "DELETE FROM cont_facturacion WHERE id_cont_Facturacion = ?",
          values: [idContFacturacion],
        });
        const result = deleteContFacturacion.affectedRows;
        if (result) {
          message = "success";
        } else {
          message = "error";
        }
        res.status(200).json({ response: { message: message, facturacion: deleteContFacturacion } });
      }
}