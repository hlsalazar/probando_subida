import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const { id_comp, nombre_comp } = req.query;

    if(req.method === "GET"){

        const variedad = await query(
            {
                query: "SELECT * FROM variedad WHERE id_variedadFlor =? OR nombre_VariedadFlor=?",
                values: ([id_comp, nombre_comp]),
            }
        );
        res.status(200).json({variedad: variedad});
    }
    
}