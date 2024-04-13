import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const { id_comp, nombre_comp } = req.query;

    if(req.method === "GET"){

        const cargo = await query(
            {
                query: "SELECT * FROM valuecargo_facturacion WHERE id=? OR name=?",
                values: ([id_comp, nombre_comp]),
            }
        );
        res.status(200).json({cargo: cargo});
    }
    
}