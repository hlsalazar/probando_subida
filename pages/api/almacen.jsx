import { query } from "@/lib/database";

export default async function handler(req, res){


    let message = "";

    if(req.method === "GET"){

        const almacen = await query(
            {
                query: "SELECT * FROM almacen",
                values: [],
            }
        );
        res.status(200).json({almacen: almacen});
    }

    if(req.method === "POST"){
        const cantidadAlmacen = req.body.cantidad_materialAlmacen;
        const nombreAlmacen = req.body.nombre_materialAlmacen;
        const tipoAlmacen = req.body.tipo_materialAlmacen;
        const observacionesAlmacen = req.body.observaciones_materialAlmacen;

        const addAlmacen = await query({
            query: "INSERT INTO almacen (cantidad_materialAlmacen, nombre_materialAlmacen, tipo_materialAlmacen, observaciones_materialAlmacen) VALUES (?,?,?,?)",              
            values: ([cantidadAlmacen,
                    nombreAlmacen,
                    tipoAlmacen,
                    observacionesAlmacen]),
        });

        if(addAlmacen.insertId){
            message = "success";
        } else {
            message = "error";
        }
        let almacen = {
            id_materialAlmacen: addAlmacen.insertId,
            nombre_materialAlmacen: nombreAlmacen, 
        };
        res.status(200).json({response: {message: message, almacen: almacen}});
    }

    if(req.method === "PUT"){

        const idAlmacen = req.body.id_materialAlmacen;
        const cantidadAlmacen = req.body.cantidad_materialAlmacen;
        const nombreAlmacen = req.body.nombre_materialAlmacen;
        const tipoAlmacen = req.body.tipo_materialAlmacen;
        const observacionesAlmacen = req.body.observaciones_materialAlmacen;

        const updateAlmacen = await query({

            query: "UPDATE almacen SET cantidad_materialAlmacen=?, nombre_materialAlmacen=?, tipo_materialAlmacen=?, observaciones_materialAlmacen=? WHERE id_materialAlmacen=?",
            values: ([cantidadAlmacen,nombreAlmacen,tipoAlmacen, observacionesAlmacen,idAlmacen]),
                         
        });

        const result = updateAlmacen.affectedRows;
        if(result){
            message = "success";
        } else {
            message = "error";
        }
        let almacen = {
            id_materialAlmacen: idAlmacen,
            cantidad_materialAlmacen: cantidadAlmacen,
            nombre_materialAlmacen: nombreAlmacen,
            tipo_materialAlmacen: tipoAlmacen,
            observaciones_materialAlmacen: observacionesAlmacen,  
        };
        res.status(200).json({response: {message: message, almacen: almacen}});
    }
    

    if (req.method === "DELETE") {
        const idAlmacen = req.body.id_materialAlmacen;
        const deleteAlmacen = await query({
          query: "DELETE FROM almacen WHERE id_materialAlmacen = ?",
          values: [idAlmacen],
        });
        const result = deleteAlmacen.affectedRows;
        if (result) {
          message = "success";
        } else {
          message = "error";
        }
        res.status(200).json({ response: { message: message, almacen: almacen } });
      }
}