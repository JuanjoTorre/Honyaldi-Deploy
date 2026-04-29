/**********************************************************************CONTROLADOR DE DIRIGIDO A
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/

//Dependecias y modulos
const {validarDG} = require('../helpers/validar');


//Modelos
const DirigidoAModel = require("../models/dirigidoAModel");



/***************************METODOS DEL CONTROLADOR DE DIRIGIDO A
************************************************************************/


/**********CREAR UN NUEVO DIRIGIDO A
***************************************/
const nuevoDG = async (req, res) => {

    //Obtenemos el nombre de Dirigido A
    const params = req.body;



    //Validar los datos      
    try {

        validarDG(params);

    }
    catch (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'Faltan datos por enviar'

            });
    }

    //Control  de Dirigido a duplicados
    try {
        const dg = await DirigidoAModel.find({name: params.name}).exec();

        //Si la consulta es ok pero el dirigido A ya existe
        if(dg && dg.length >=1){
            return res.status(400).send({
                status: "error",
                message: "El Dirigido a  ya existe"
            });
        }
        //Creamos un objeto de Dirigido a con los datos que nos llegan a traves de params
        let dgToSave = new DirigidoAModel(params);


        //Guardamos el dirigido en la bbdd
        try {
            const dgStored = await dgToSave.save();

            if(dgStored){
                //Devolvemos el resultado
                return res.status(200).send({
                    status: "success",
                    message: 'Dirigido a registrado correctamente',
                    grupo: dgStored
                })
            }
        } catch (error) {
            return res.status(400).send({
                status: "error",
                message: "Error al guardar el Dirigido a "
            });
        }

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
        });
    } 


}


/**************BORRAR UN  DIRIGIDO A
**************************************/
const borrarDG = async (req, res) => {

    //Conseguimos el id del Dirigido a. Nos llegara a traves de la url
    const dgId = req.params.id;



    //Buscamos el Dirigido a en la base de datos y la borramos
    try {
        const dgToDeleted = await DirigidoAModel.findByIdAndDelete ({ "_id": dgId })

        if(dgToDeleted == null)
        {
            return res.status(400).send({
                status: "error",
                message: "Dirigido a no encontrado"
            });
        }

        //Devolvemos la respuesta
        return res.status(200).send({
            status: "success",
            message: "Dirigido A borrado",
            product: dgToDeleted
        });

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
            
        });
    }

}


/**************EDITAR UN  DIRIGIDO A
**************************************/
const editarDG = async (req, res) => {
    //Conseguimos el id del Dirigido A (llega por url)
    const dgId = req.params.id;

    //Conseguimos los nuevos datos del Dirigido A
    const dgToEdit = req.body; 

    //Validamos los datos que recibimos
    try {
        validarDG(dgToEdit);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error de validacion de datos"
        });
    }

    //Buscamos y actualizamos el Dirigido A en la bbdd
    try {
        let dgActualizado = await DirigidoAModel.findOneAndUpdate({_id:dgId}, dgToEdit, {new:true}).exec();

        //Devolvemos la respuesta con exito o fracaso
        if(!dgActualizado){
            return res.status(400).send({
                status: "error",
                message: "Error en la actualizacion"
                   
            });

        }
        else{
            return res.status(200).send({
                status: "success",
                message: `El Dirigido A ${dgActualizado.name} ha sido actualizado con exito`
    
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error gral en la consulta"

        });
    }

    

}


/**************LISTAR  LOS DIRIGIDO A
**************************************/
const listarDG = async(req, res) => {

    //Hacemos la consulta
    try {
        
        const dgList = await DirigidoAModel
        .find()
        .sort({name: "asc"})
        .exec();

        //Obtenemos el total de Dirigido a
        let total = await DirigidoAModel.find();

        //Comprobamos y respondemos
        if (!dgList) {
            return res.status(400).send({
                status: "error",
                message: "Error en la consulta"
            });
            
        } else {
            return res.status(200).send({
                status: "success",
                dgList,
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
    nuevoDG,
    borrarDG,
    editarDG,
    listarDG

}