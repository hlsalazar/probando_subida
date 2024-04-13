import { query } from "@/lib/database";

export default async function handler(req, res) {
    const { id_gestionFlor, PROVEEDOR, VARIEDAD } = req.query;

    if (req.method === "GET") {
        // Filtrar las condiciones que tienen valores no nulos
        const conditions = [];
        if (id_gestionFlor) conditions.push("id_gestionFlor=?");
        if (PROVEEDOR) conditions.push("PROVEEDOR=?");
        if (VARIEDAD) conditions.push("VARIEDAD=?");

        // Construir la consulta SQL con las condiciones
        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" OR ")}` : "";

        // Ejecutar la consulta
        const flor = await query({
            query: `SELECT * FROM flor ${whereClause}`,
            values: ([id_gestionFlor, PROVEEDOR, VARIEDAD]),
        });

        res.status(200).json({ flor: flor });
    }
}