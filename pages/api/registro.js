import { query } from "@/lib/database";

export default async function handler(req, res){

 

    if(req.method === "POST"){

        const usuario = req.body.usuario;
        const clave = req.body.clave;
        const rol = req.body.rol;
    
        
        const addRegistro = await query({
            query: "INSERT INTO usuarios (username, password, rol) VALUES (?,?,?)",              
            values: ([usuario,
                clave,
                rol
            ]),
        });

        if(addRegistro.insertId){
            message = "success";
        } else {
            message = "error";
        }
        res.status(200).json({response: {message: message, codigo: addRegistro}});
    }
}