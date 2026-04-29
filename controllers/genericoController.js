/**********************************************************************CONTROLADOR DE GENERICOS
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/

//Dependecias y modulos
const {validarGN} = require('../helpers/validar');

//Modelos
const GenericoModel = require("../models/genericoModel");



/****************************METODOS DEL CONTROLADOR DE GENERICOS
************************************************************************/




/************CREAR UN NUEVO GENERICO
 ***************************************/
const nuevoGN = async (req, res) => {

    //Obtenemos el nombre de tipo de producto
    const params = req.body;


    //Validar los datos      
    try 
    {
        validarGN(params);
    }
    catch (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'Faltan datos por enviar',
                params

            });
    }


    //Control  de genericos duplicados
    try 
    {
        const gn = await GenericoModel.find({name: params.name}).exec();

        //Si la consulta es ok pero el tipo de producto ya existe
        if(gn && gn.length >=1){
            return res.status(400).send({
                status: "error",
                message: "El Generico ya existe"
            });
        }


        //Creamos un objeto de generico con los datos que nos llegan a traves de params
        let gnToSave = new GenericoModel(params);


        //Guardamos el generico en la bbdd
        try {
            const gnStored = await gnToSave.save();


            if(gnStored){
                //Devolvemos el resultado
                return res.status(200).send({
                    status: "success",
                    message: 'Generico registrado correctamente',
                    tipo: gnStored
                });
            }
        } catch (error) {
            return res.status(400).send({
                status: "error",
                message: "Error al guardar el Generico",
                gnStored
            });
        }

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
        });
    } 


}




/****************BORRAR UN  GENERICO
**************************************/
const borrarGN = async (req, res) => {

    //Conseguimos el id del generico. Nos llegara a traves de la url
    const gnId = req.params.id;


    //Buscamos el generico en la base de datos y la borramos
    try {
        const gnToDeleted = await GenericoModel.findByIdAndDelete ({ "_id": gnId })

        if(gnToDeleted == null)
        {
            return res.status(400).send({
                status: "error",
                message: "Generico no encontrado"
            });
        }

        //Devolvemos la respuesta
        return res.status(200).send({
            status: "success",
            message: "Generico borrado",
            product: gnToDeleted
        })
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
            
        })
    }

}



/****************EDITAR UN  GENERICO
**************************************/
const editarGN = async (req, res) => {
    //Conseguimos el id del generico (llega por url)
    const gnId = req.params.id;

    //Conseguimos los nuevos datos del generico
    const gnToEdit = req.body; 

    //Validamos los datos que recibimos
    try {
        validarGN(gnToEdit);     

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error de validacion de datos"
        });
    }

    //Validamos que no exista un generico con ese nombre
    try {
        const gn = await GenericoModel.find({name: gnToEdit.name}).exec();

        //Si la consulta es ok pero el generico ya existe
        if(gn && gn.length >=1){
            return res.status(400).send({
                status: "error",
                message: "El Generico ya existe"
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error de repeticion de datos"

        });
    }

    //Buscamos y actualizamos el generico en la bbdd
    try {
        let gnActualizado = await GenericoModel.findOneAndUpdate({_id:gnId}, gnToEdit, {new:true}).exec();

        //Devolvemos la respuesta con exito o fracaso
        if(!gnActualizado)
        {
            return res.status(400).send({
                status: "error",
                message: "Error en la actualizacion"
                   
            });

        }
        else
        {
            return res.status(200).send({
                status: "success",
                message: `El generico ${gnActualizado.name} ha sido actualizado con exito`
    
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error gral en la consulta",


        });
    }

    

}


/**************LISTAR  LOS GENERICOS
**************************************/
const todosGN = async(req, res) => {

    //Hacemos la consulta
    try {
        
        const listGN = await GenericoModel
        .find()
        .sort({name: "asc"})
        .exec();

        //Calculamos el numero de tipos de producto
        let total = await GenericoModel.find();

        //Comprobamos y respondemos
        if (!listGN) {
            return res.status(400).send({
                status: "error",
                message: "Error en la consulta"
            });
            
        } else {
            return res.status(200).send({
                status: "success",
                listGN,
                total: total.length,
            });
        }

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
        });
    }


}


/********************************************EXPORTAMOS LOS METODOS
************************************************************************/
module.exports = {
    nuevoGN,
    borrarGN,
    editarGN,
    todosGN

}