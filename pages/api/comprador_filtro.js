import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const { id_comp, nombre_comp } = req.query;

    if(req.method === "GET"){

        const comprador = await query(
            {
                query: "SELECT * FROM comprador WHERE id_comp=? OR nombre_comp=?",
                values: ([id_comp, nombre_comp]),
            }
        );
        res.status(200).json({comprador: comprador});
    }
    
}