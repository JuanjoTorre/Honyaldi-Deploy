/*************************************************************CONTROLADOR DE GRUPO RESTRINGIDO
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/

//Dependecias y modulos

const {validarGR} = require('../helpers/validar');

//Modelos
const GrupoRestringidoModel = require("../models/grupoRestringidoModel");




/*******************METODOS DEL CONTROLADOR DE GRUPO RESTRINGIDO
************************************************************************/

/*CREAR UN NUEVO GRUPO RESTRINGIDO
***************************************/
const nuevoGR = async (req, res) => {

    //Obtenemos el nombre de Grupo restringigo
    const params = req.body;



    //Validar los datos      
    try {

        validarGR(params);

    }
    catch (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'Faltan datos por enviar'

            });
    }

    //Control  de Grupos restringidos duplicados
    try {
        const gr = await GrupoRestringidoModel.find({name: params.name}).exec();

        //Si la consulta es ok pero el grupo restringido ya existe
        if(gr && gr.length >=1){
            return res.status(400).send({
                status: "error",
                message: "El Grupo restringido  ya existe"
            });
        }
        //Creamos un objeto de proveedor con los datos que nos llegan a traves de params
        let grToSave = new GrupoRestringidoModel(params);


        //Guardamos el producto en la bbdd
        try {
            const grStored = await grToSave.save();

            if(grStored){
                //Devolvemos el resultado
                return res.status(200).send({
                    status: "success",
                    message: 'Grupo Restringido registrado correctamente',
                    grupo: grStored
                })
            }
        } catch (error) {
            return res.status(400).send({
                status: "error",
                message: "Error al guardar el Grupo restringido"
            });
        }

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
        });
    } 


}

/*****BORRAR UN  GRUPO RESTRINGIDO
**************************************/
const borrarGR = async (req, res) => {

    //Conseguimos el id del grupo restringido. Nos llegara a traves de la url
    const grId = req.params.id;



    //Buscamos el proveedor en la base de datos y la borramos
    try {
        const grToDeleted = await GrupoRestringidoModel.findByIdAndDelete ({ "_id": grId })

        if(grToDeleted == null)
        {
            return res.status(400).send({
                status: "error",
                message: "Grupo restringido no encontrado"
            });
        }

        //Devolvemos la respuesta
        return res.status(200).send({
            status: "success",
            message: "Grupo restringido borrado",
            product: grToDeleted
        })
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
            
        })
    }

}

/*****EDITAR UN  GRUPO RESTRINGIDO
**************************************/
const editarGR = async (req, res) => {
    //Conseguimos el id del grupo restringido (llega por url)
    const grId = req.params.id;

    //Conseguimos los nuevos datos del grupo restringido
    const grToEdit = req.body; 



    //Validamos los datos que recibimos
    try {
        validarGR(grToEdit);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error de validacion de datos"
        })
    }

    //Buscamos y actualizamos el proveedor en la bbdd
    try {
        let grActualizado = await GrupoRestringidoModel.findOneAndUpdate({_id:grId}, grToEdit, {new:true}).exec();

        //Devolvemos la respuesta con exito o fracaso
        if(!grActualizado){
            return res.status(400).send({
                status: "error",
                message: "Error en la actualizacion"
                   
            });

        }
        else{
            return res.status(200).send({
                status: "success",
                message: `El grupo restringido ${grActualizado.name} ha sido actualizado con exito`
    
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error gral en la consulta"

        });
    }

    

}

/***LISTAR  LOS GRUPOS RESTRNGIDOS
**************************************/
const listarGR = async(req, res) => {


    //Hacemos la consulta
    try {
        
        const grList = await GrupoRestringidoModel
        .find()
        .sort({name: "asc"})
        .exec();

        //Obtenemos el total de grupos restringidos
        let total = await GrupoRestringidoModel.find();

        //Comprobamos y respondemos
        if (!grList) {
            return res.status(400).send({
                status: "error",
                message: "Error en la consulta"
            });
            
        } else {
            return res.status(200).send({
                status: "success",
                grList,
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
    nuevoGR,
    borrarGR,
    editarGR,
    listarGR

}
