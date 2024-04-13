import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const { nombre_comp } = req.query;

    if(req.method === "GET"){

        const facturas_comprador = await query(
            {
                query: "SELECT fecha_calFacturacion, hora_calFacturacion FROM datos_facturacion WHERE comprador_calFacturacion=?",
                values: ([nombre_comp]),
            }
        );
        res.status(200).json({facturas_comprador: facturas_comprador});
    }
    
}