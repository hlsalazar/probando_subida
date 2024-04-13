import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const { id_proveedor, cedula_proveedor, nombre_proveedor, telefono_proveedor, observaciones_proveedor } = req.query;

    if(req.method === "GET"){

        const proveedores = await query(
            {
                query: "SELECT * FROM proveedor WHERE id_proveedor=? OR cedula_proveedor=? OR nombre_proveedor=? OR telefono_proveedor=? OR observaciones_proveedor=? ",
                values: ([id_proveedor, cedula_proveedor, nombre_proveedor, telefono_proveedor, observaciones_proveedor]),
            }
        );
        res.status(200).json({proveedores: proveedores});
    }
    
}