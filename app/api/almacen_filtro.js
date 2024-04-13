import { query } from "@/lib/database";

export default async function handler(req, res){


    const { id_materialAlmacen, cantidad_materialAlmacen, nombre_materialAlmacen, tipo_materialAlmacen, observaciones_materialAlmacen } = req.query;

    if(req.method === "GET"){

        const almacen = await query(
            {
                query: "SELECT * FROM almacen WHERE id_materialAlmacen=? OR cantidad_materialAlmacen=? OR nombre_materialAlmacen=? OR tipo_materialAlmacen=? OR observaciones_materialAlmacen=? ",
                values: ([id_materialAlmacen, cantidad_materialAlmacen, nombre_materialAlmacen, tipo_materialAlmacen, observaciones_materialAlmacen]),
            }
        );
        res.status(200).json({almacen: almacen});
    }
    
}