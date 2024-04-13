import { query } from "@/lib/database";

export default async function handler(req, res){


    let message;

    if (req.method === "GET") {
        const variedad = await query(
            {
                query: "SELECT *FROM variedad",
                values: [],
            }
        );
        res.status(200).json({ variedad: variedad });
    }
}