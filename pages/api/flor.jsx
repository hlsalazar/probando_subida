import { query } from "@/lib/database";

export default async function handler(req, res) {
    //metodos para la gestion de la flor
    if (req.method === "GET") {
        const flor = await query(
            {
                query: "SELECT *FROM flor",
                values: [],
            }
        );
        res.status(200).json({ flor: flor });
    }
     //metodos para la proveedor
     /*if (req.method === "GET") {
        const proveedor = await query(
            {
                query: "SELECT *FROM proveedor",
                values: [],
            }
        );
        res.status(200).json({ proveedor: proveedor });
    }*/

    if (req.method === "POST") {
        const proveedorFlor = req.body.proveedor_gestionFlor;
        const variedadFlor = req.body.variedad_gestionFlor;
        const tmallasFlor = req.body.tMallas_gestionFlor;
        const tTallosxmallaFlor = req.body.tTallosxMalla_gestionflor;
        const tallosSueltosFlor = req.body.tallosSueltos_gestionFlor;
        const tTallosFlor = req.body.tTallos_gestionFlor;
        const tallos40Flor = req.body.tallos40_gestionFlor;
        const tallos50Flor = req.body.tallos50_gestionFlor;
        const tallos60Flor = req.body.tallos60_gestionFlor;
        const tallos70Flor = req.body.tallos70_gestionFlor;
        const tallos80Flor = req.body.tallos80_gestionFlor;
        const tallos90Flor = req.body.tallos90_gestionFlor;
        const tBonchesFlor = req.body.tBonches_gestionFlor;
        const tallosNacionalFlor = req.body.tNacional_gestionFlor;
        const tallosSobrantesFlor = req.body.tallosSobrante_gestionFlor;
        const tVariedadFlor = req.body.tVariedad_gestionFlor;

        const addFlor = await query({
            query: "INSERT INTO flor (PROVEEDOR, VARIEDAD, tMallas_gestionFlor, tTallosxMalla_gestionflor, tallosSueltos_gestionFlor, tTallos_gestionFlor,tallos40_gestionFlor, tallos50_gestionFlor, tallos60_gestionFlor, tallos70_gestionFlor, tallos80_gestionFlor, talllos90_gestionFlor ,tBonches_gestionFlor, tallosNacional_gestionFlor, talloSobrante_gestionFlor, tVariedad_gestionFlor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            values: ([proveedorFlor, variedadFlor, tmallasFlor, tTallosxmallaFlor, tallosSueltosFlor, tTallosFlor,tallos40Flor, tallos50Flor, tallos60Flor, tallos70Flor, tallos80Flor, tallos90Flor,tBonchesFlor, tallosNacionalFlor, tallosSobrantesFlor, tVariedadFlor]),
        });
        let message = "";
        if (addFlor.insertId) {
            message = "success";
        } else {
            message = "error";
        }
        let flor = {
            id_gestionFlor: addFlor.insertId,
            PROVEEDOR: proveedorFlor,
            VARIEDAD: variedadFlor,
            tMallas_gestionFlor: tmallasFlor,
            tTallosxMalla_gestionflor: tTallosxmallaFlor,
            tallosSueltos_gestionFlor: tallosSueltosFlor,
            tTallos_gestionFlor: tTallosFlor,
            tallos40_gestionFlor: tallos40Flor,
            tallos50_gestionFlor: tallos50Flor,
            tallos60_gestionFlor: tallos60Flor,
            tallos70_gestionFlor: tallos70Flor,
            tallos80_gestionFlor: tallos80Flor,
            tallos90_gestionFlor: tallos90Flor,
            tBonches_gestionFlor: tBonchesFlor,
            tNacional_gstionFlor: tallosNacionalFlor,
            tallosSobrantes_gestionFlor: tallosSobrantesFlor,
            tVariedad_gestionFlor: tVariedadFlor,
        };
        res.status(200).json({ response: { message: message, flor: flor } });
    }

    if (req.method === "PUT") {
        const idFlor = req.body.id_gestionFlor;
        const proveedorFlor = req.body.proveedor_gestionFlor;
        const variedadFlor = req.body.variedad_gestionFlor;
        const tmallasFlor = req.body.tMallas_gestionFlor;
        const tTallosxmallaFlor = req.body.tTallosxMalla_gestionflor;
        const tallosSueltosFlor = req.body.tallosSueltos_gestionFlor;
        const tTallosFlor = req.body.tTallos_gestionFlor;
        const tallos40Flor = req.body.tallos40_gestionFlor;
        const tallos50Flor = req.body.tallos50_gestionFlor;
        const tallos60Flor = req.body.tallos60_gestionFlor;
        const tallos70Flor = req.body.tallos70_gestionFlor;
        const tallos80Flor = req.body.tallos80_gestionFlor;
        const tallos90Flor = req.body.tallos90_gestionFlor;
        const tBonchesFlor = req.body.tBonches_gestionFlor;
        const tallosNacionalFlor = req.body.tallosNacional_gestionFlor;
        const tallosSobrantesFlor = req.body.talloSobrante_gestionFlor;
        const tVariedadFlor = req.body.tVariedad_gestionFlor;
        
        const updateFlor = await query({
            query: "UPDATE flor SET PROVEEDOR = ?, VARIEDAD = ?, tMallas_gestionFlor = ?, tTallosxMalla_gestionflor = ?, tallosSueltos_gestionFlor = ?, tTallos_gestionFlor = ?, tallos40_gestionFlor = ?, tallos50_gestionFlor = ?, tallos60_gestionFlor = ?, tallos70_gestionFlor = ?, tallos80_gestionFlor = ?, talllos90_gestionFlor = ?, tBonches_gestionFlor = ?, tallosNacional_gestionFlor = ?, talloSobrante_gestionFlor = ?, tVariedad_gestionFlor = ?   WHERE id_gestionFlor = ? ",
            values: [proveedorFlor, variedadFlor, tmallasFlor, tTallosxmallaFlor, tallosSueltosFlor, tTallosFlor, tallos40Flor, tallos50Flor, tallos60Flor, tallos70Flor, tallos80Flor, tallos90Flor, tBonchesFlor, tallosNacionalFlor, tallosSobrantesFlor, tVariedadFlor, idFlor],
        });
        let message = '';
        const result = updateFlor.affectedRows;
        if (result) {
            message = "success";
        } else {
            message = "error al editar";
        }
        const flor = {
            id_gestionFlor: idFlor,
            PROVEEDOR: proveedorFlor,
            VARIEDAD: variedadFlor,
            tMallas_gestionFlor: tmallasFlor,
            tTallosxMalla_gestionflor: tTallosxmallaFlor,
            tallosSueltos_gestionFlor: tallosSueltosFlor,
            tTallos_gestionFlor: tTallosFlor,
            tallos40_gestionFlor: tallos40Flor,
            tallos50_gestionFlor: tallos50Flor,
            tallos60_gestionFlor: tallos60Flor,
            tallos70_gestionFlor: tallos70Flor,
            tallos80_gestionFlor: tallos80Flor,
            tallos90_gestionFlor: tallos90Flor,
            tBonches_gestionFlor: tBonchesFlor,
            tNacional_gstionFlor: tallosNacionalFlor,
            tallosSobrantes_gestionFlor: tallosSobrantesFlor,
            tVariedad_gestionFlor: tVariedadFlor,
        };
        res
            .status(200)
            .json({ response: { message: message, flor: flor } });
    }

    if (req.method === "DELETE") {
        const idFlor = req.body.id_gestionFlor;
        const deleteFlor = await query({
            query: "DELETE FROM flor WHERE id_gestionFlor = ?",
            values: [idFlor],

        });

        const result = deleteFlor.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error al eliminar";
        }
        res
            .status(200)
            .json({ response: { message: message, id_gestionFlor: idFlor } });
    }

    //metodos para la variedad
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