import { query } from "@/lib/database";

export default async function handler(req, res) {



    const { id_personal, cedula_personal, nombre_personal, cargo_personal, direccion_personal, telefono_personal } = req.query;

    if (req.method === "GET") {

        const personal = await query(
            {
                query: "SELECT * FROM personal WHERE id_personal=? OR cedula_personal=? OR nombre_personal=? OR cargo_personal=? OR direccion_personal=? OR telefono_personal=?",
                values: ([id_personal, cedula_personal, nombre_personal, cargo_personal, direccion_personal, telefono_personal]),
            }
        );
        res.status(200).json({ personal: personal });
    }

}