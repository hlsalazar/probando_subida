import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    const {fecha_cont_facturacion, hora_cont_facturacion} = req.query;

    if(req.method === "GET"){

        const totalEqFull = await query(
            {
                query: "SELECT SUM(eqFullBoxes_cont_facturacion) FROM cont_facturacion  WHERE fecha_cont_facturacion=? AND hora_cont_facturacion=?",
                values: ([fecha_cont_facturacion, hora_cont_facturacion]),
            }
        );
        res.status(200).json({totalEqFull: totalEqFull});
    }

}

    
    