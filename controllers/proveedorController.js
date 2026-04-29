/********************************************************************CONTROLADOR DE PROVEEDORES
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/

//Dependecias y modulos
const {validarProveedor} = require('../helpers/validar');

//Modelos
const ProveedorModel = require("../models/proveedorModel");





/*************************METODOS DEL CONTROLADOR DE PROVEEDORES
************************************************************************/


/*********CREAR UN NUEVO PROVEEDOR
**************************************/
const nuevoProv = async (req, res) => {

    //Obtenemos el nombre de proveedor
    const params = req.body;

    //Validar los datos      
    try {

        validarProveedor(params);

    }
    catch (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'Faltan datos por enviar'

            });
    }

    //Control  de proveedores duplicados
    try {
        const proveedor = await ProveedorModel.find({name: params.name}).exec();

        //Si la consulta es ok pero el proveedor ya existe
        if(proveedor && proveedor.length >=1){
            return res.status(400).send({
                status: "error",
                message: "El proveedor ya existe"
            });
        }
        //Creamos un objeto de proveedor con los datos que nos llegan a traves de params
        let proveedorToSave = new ProveedorModel(params);


        //Guardamos el producto en la bbdd
        try {
            const proveedorStored = await proveedorToSave.save();

            if(proveedorStored){
                //Devolvemos el resultado
                return res.status(200).send({
                    status: "success",
                    message: 'Proveedor registrado correctamente',
                    proveedor: proveedorStored
                })
            }
        } catch (error) {
            return res.status(400).send({
                status: "error",
                message: "Error al guardar el proveedor"
            });
        }

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
        });
    } 


}

/**************BORRAR UN  PROVEEDOR
**************************************/
const borrarProv = async (req, res) => {

    //Conseguimos el id del proveedor. Nos llegara a traves de la url
    const proveedorId = req.params.id;


    //Buscamos el proveedor en la base de datos y la borramos
    try {
        const provToDeleted = await ProveedorModel.findByIdAndDelete ({ "_id": proveedorId })

        if(provToDeleted == null)
        {
            return res.status(400).send({
                status: "error",
                message: "Proveedor no encontrado"
            });
        }

        //Devolvemos la respuesta
        return res.status(200).send({
            status: "success",
            message: "Proveedor borrado",
            product: provToDeleted
        })
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error general"
            
        })
    }

}

/**************EDITAR UN  PROVEEDOR
**************************************/
const editarProv = async (req, res) => {
    //Conseguimos el id del proveedor (llega por url)
    const provId = req.params.id;

    //Conseguimos los nuevos datos del proveedor
    const provToEdit = req.body; 

    //Validamos los datos que recibimos
    try {
        validarProveedor(provToEdit);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error de validacion de datos"
        })
    }

    //Buscamos y actualizamos el proveedor en la bbdd
    try {
        let provActualizado = await ProveedorModel.findOneAndUpdate({_id:provId}, provToEdit, {new:true}).exec();

        //Devolvemos la respuesta con exito o fracaso
        if(!provActualizado){
            return res.status(400).send({
                status: "error",
                message: "Error en la actualizacion"
                   
            });

        }
        else{
            return res.status(200).send({
                status: "success",
                message: `El proveedor ${provActualizado.name} ha sido actualizado con exito`
    
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Error gral en la consulta"

        });
    }

    

}

/*****LISTAR TODOS LOS PROVEEDORES
**************************************/
const todosProv = async(req, res) => {

    //Hacemos la consulta
    try {
        
        const listProv = await ProveedorModel
        .find()
        .sort({name: "asc"})
        .exec();

        //Calculamos el total de proveedores
        let total = await ProveedorModel.find();

        //Comprobamos y respondemos
        if (!listProv) {
            return res.status(400).send({
                status: "error",
                message: "Error en la consulta"
            });
            
        } else {
            return res.status(200).send({
                status: "success",
                listProv,
                total: total.length,
            });
        }

    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: error
        });
    }


}


/********************************************EXPORTAMOS LOS METODOS
************************************************************************/
module.exports = {
    nuevoProv,
    borrarProv,
    editarProv,
    todosProv

}