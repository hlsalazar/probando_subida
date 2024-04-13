import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    if(req.method === "GET"){

        const variedad = await query(
            {
                query: "SELECT * FROM variedad",
                values: [],
            }
        );
        res.status(200).json({variedad: variedad});
    }

    if(req.method === "POST"){
        const nombreVariedad = req.body.nombre_comp;

        const addVariedad = await query({
            query: "INSERT INTO variedad (nombre_VariedadFlor) VALUES (?)",              
            values: ([nombreVariedad]),
        });

        if(addVariedad.insertId){
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
        res.status(200).json({response: {message: message, variedad: addVariedad}});
    }

    if(req.method === "PUT"){

        const idVariedad = req.body.id_comp;
        const nombreVariedad = req.body.nombre_comp;

        const updateVariedad = await query({

            query: "UPDATE variedad SET nombre_VariedadFlor=? WHERE id_variedadFlor=?",
            values: ([nombreVariedad, idVariedad]),
                         
        });

        //indicar varias constantes para la actualizacion de variables mediante query,
        //primero revisar el tutorial para ver si realmente funciona
        
        const result = updateVariedad.affectedRows;
        if(result){
            message = "success";
        } else {
            message = "error";
        }
        let variedad = {
            id: idVariedad,
            name: nombreVariedad,
        };
        res.status(200).json({response: {message: message, variedad: variedad}});
    }
    

    if (req.method === "DELETE") {
        const idVariedad = req.body.id_comp;
        const deleteVariedad = await query({
          query: "DELETE FROM variedad WHERE id_variedadFlor = ?",
          values: [idVariedad],
        });
        const result = deleteVariedad.affectedRows;
        if (result) {
          message = "success";
        } else {
          message = "error";
        }
        res.status(200).json({ response: { message: message, cargo: cargo } });
      }

}