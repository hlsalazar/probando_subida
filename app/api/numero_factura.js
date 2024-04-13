import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const {compradorNombre} = req.query;

    if (req.method === "GET") {

        const numeroFactura = await query(
            {
                query: "SELECT id_calFacturacion FROM datos_facturacion WHERE comprador_calFacturacion=? ORDER BY id_calFacturacion DESC LIMIT 1",
                values: ([compradorNombre]),
            }
        );

            res.status(200).json({ numeroFactura: numeroFactura });            
    }
}