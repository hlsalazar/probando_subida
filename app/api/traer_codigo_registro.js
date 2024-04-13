import {query} from "@/lib/database";

export default async function handler(req, res){

    const {rol} = req.query;

    if(req.method === "GET"){

        const codigoConsulta = await query(
            {
                query: "SELECT codigo FROM roles WHERE rol = ? ",
                values: ([rol]),
            }
        );
        res.status(200).json({response : {codigo: codigoConsulta}});
    }

}