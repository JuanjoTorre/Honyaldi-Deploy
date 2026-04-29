/**********************************************************************CONTROLADOR DE CONCRETOS
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/

//Dependecias y modulos
const {validarCR} = require('../helpers/validar');

//Modelos
const ConcretoModel = require("../models/concretoModel");



/***************************METODOS DEL CONTROLADOR DE CONCRETOS
************************************************************************/




/************CREAR UN NUEVO CONCRETO
 ***************************************/
const nuevoCR = async (req, res) => {

    //Obtenemos el nombre de tipo de producto
    const params = req.body;


    //Validar los datos      
    try 
    {

        validarCR(params);
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
        const cr = await ConcretoModel.find({name: params.name}).exec();

        //Si la consulta es ok pero el concreto ya existe
        if(cr && cr.length >=1){
            return res.status(400).send({
                status: "error",
                message: "El Concreto ya existe"
            });
        }


        //Creamos un objeto de concreto con los datos que nos llegan a traves de params
        let crToSave = new ConcretoModel(params);


        //Guardamos el generico en la bbdd
        try {
            const crStored = await crToSave.save();


            if(crStored){
                //Devolvemos el resultado
                return res.status(200).send({
                    status: "success",
                    message: 'Concreto registrado correctamente',
                    tipo: crStored
                });
            }
        } catch (error) {
            return res.status(400).send({
                status: "error",
                message: "Error al guardar el Concreto",
                crStored
            });
        }

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
        });
    } 


}




/****************BORRAR UN  CONCRETO
**************************************/
const borrarCR = async (req, res) => {

    //Conseguimos el id del concreto. Nos llegara a traves de la url
    const crId = req.params.id;


    //Buscamos el concreto en la base de datos y la borramos
    try {
        const crToDeleted = await ConcretoModel.findByIdAndDelete ({ "_id": crId })

        if(crToDeleted == null)
        {
            return res.status(400).send({
                status: "error",
                message: "Concreto no encontrado"
            });
        }

        //Devolvemos la respuesta
        return res.status(200).send({
            status: "success",
            message: "Concreto borrado",
            product: crToDeleted
        })
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
            
        })
    }

}



/****************EDITAR UN  CONCRETO
**************************************/
const editarCR = async (req, res) => {
    //Conseguimos el id del concreto (llega por url)
    const crId = req.params.id;

    //Conseguimos los nuevos datos del concreto
    const crToEdit = req.body; 



    //Validamos los datos que recibimos
    try {
        validarCR(crToEdit);     

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error de validacion de datos"
        });
    }

    //Validamos que no exista un concreto con ese nombre
    try {
        const cr = await ConcretoModel.find({name: crToEdit.name}).exec();

        //Si la consulta es ok pero el concreto ya existe
        if(cr && cr.length >=1){
            return res.status(400).send({
                status: "error",
                message: "El Concreto ya existe"
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error de repeticion de datos"

        });
    }

    //Buscamos y actualizamos el concreto en la bbdd
    try {
        let crActualizado = await ConcretoModel.findOneAndUpdate({_id:crId}, crToEdit, {new:true}).exec();

        //Devolvemos la respuesta con exito o fracaso
        if(!crActualizado)
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
                message: `El concreto ${crActualizado.name} ha sido actualizado con exito`
    
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error gral en la consulta",


        });
    }

    

}


/**************LISTAR  LOS CONCRETOS
**************************************/
const todosCR = async(req, res) => {

    //Hacemos la consulta
    try {
        
        const todosCR = await ConcretoModel
        .find()
        .sort({name: "asc"})
        .exec();

        //Calculamos el numero de concretos
        let totalCR = await ConcretoModel.find();

        //Comprobamos y respondemos
        if (!todosCR) {
            return res.status(400).send({
                status: "error",
                message: "Error en la consulta"
            });
            
        } else {
            return res.status(200).send({
                status: "success",
                todosCR,
                total: totalCR.length,
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
    nuevoCR,
    borrarCR,
    editarCR,
    todosCR

}