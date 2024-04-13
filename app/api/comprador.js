import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    if(req.method === "GET"){

        const comprador = await query(
            {
                query: "SELECT * FROM comprador",
                values: [],
            }
        );
        res.status(200).json({comprador: comprador});
    }

    

    if(req.method === "POST"){
        const nombreComprador = req.body.nombre_comp;

        const addComprador = await query({
            query: "INSERT INTO comprador (nombre_comp) VALUES (?)",              
            values: ([nombreComprador]),
        });

        if(addComprador.insertId){
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
        res.status(200).json({response: {message: message, comprador: addComprador}});
    }

    if(req.method === "PUT"){

        const idComprador = req.body.id_comp;
        const nombreComprador = req.body.nombre_comp;

        const updateComprador = await query({

            query: "UPDATE comprador SET nombre_comp=? WHERE id_comp=?",
            values: ([nombreComprador, idComprador]),
                         
        });

        //indicar varias constantes para la actualizacion de variables mediante query,
        //primero revisar el tutorial para ver si realmente funciona
        
        const result = updateComprador.affectedRows;
        if(result){
            message = "success";
        } else {
            message = "error";
        }
        let comprador = {
            id_comp: idComprador,
            nombre_comp: nombreComprador,
        };
        res.status(200).json({response: {message: message, comprador: comprador}});
    }
    

    if (req.method === "DELETE") {
        const idComprador = req.body.id_comp;
        const deleteComprador = await query({
          query: "DELETE FROM comprador WHERE id_comp = ?",
          values: [idComprador],
        });
        const result = deleteComprador.affectedRows;
        if (result) {
          message = "success";
        } else {
          message = "error";
        }
        res.status(200).json({ response: { message: message, comprador: comprador } });
      }
}