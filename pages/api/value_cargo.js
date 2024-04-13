import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    if(req.method === "GET"){

        const cargo = await query(
            {
                query: "SELECT * FROM valuecargo_facturacion",
                values: [],
            }
        );
        res.status(200).json({cargo: cargo});
    }

    if(req.method === "POST"){
        const nombreComprador = req.body.nombre_comp;

        const addCargo = await query({
            query: "INSERT INTO valuecargo_facturacion (name) VALUES (?)",              
            values: ([nombreComprador]),
        });

        if(addCargo.insertId){
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
        res.status(200).json({response: {message: message, cargo: addCargo}});
    }

    if(req.method === "PUT"){

        const idComprador = req.body.id_comp;
        const nombreComprador = req.body.nombre_comp;

        const updateCargo = await query({

            query: "UPDATE valuecargo_facturacion SET name=? WHERE id=?",
            values: ([nombreComprador, idComprador]),
                         
        });

        //indicar varias constantes para la actualizacion de variables mediante query,
        //primero revisar el tutorial para ver si realmente funciona
        
        const result = updateCargo.affectedRows;
        if(result){
            message = "success";
        } else {
            message = "error";
        }
        let cargo = {
            id: idComprador,
            name: nombreComprador,
        };
        res.status(200).json({response: {message: message, cargo: cargo}});
    }
    

    if (req.method === "DELETE") {
        const idComprador = req.body.id_comp;
        const deleteCargo = await query({
          query: "DELETE FROM valuecargo_facturacion WHERE id = ?",
          values: [idComprador],
        });
        const result = deleteCargo.affectedRows;
        if (result) {
          message = "success";
        } else {
          message = "error";
        }
        res.status(200).json({ response: { message: message, cargo: cargo } });
      }

}