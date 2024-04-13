import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    if(req.method === "GET"){

        const paises = await query(
            {
                query: "SELECT * FROM country",
                values: [],
            }
        );
        res.status(200).json({paises: paises});
    }

}