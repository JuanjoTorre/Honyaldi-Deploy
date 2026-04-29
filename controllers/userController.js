/***************************************************************************CONTROLADOR DE USERS
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/
//Dependencias y modulos
const bcrypt = require("bcrypt");

//Modelos
const UserModel = require("../models/userModel");



/****************************************************METODOS DE USERS
************************************************************************/


/**********************NUEVO USUARIO
**************************************/
const nuevoUser = async( req, res ) => {

    //Recogemos los datos que llegan por el body
    let params = req.body;


   

    //Comprobamos que nos llegan datos
    if(!params.name || !params.password){
        return res.status(400).send({
            status: "error",
            message: "DATOS INCORRECTOS"
         })
    }

    //Ciframos la contraseña
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    //Creamos un objeto de usuario con los datos que llegan por params
    let userToSave = new UserModel(params);


    //Guardamos usuario en la bd
    try {
        const userStored = userToSave.save();
        if(userStored){
            //Devolvemos el resultado
            return res.status(200).json({
                status: "success",
                message: "Usuario registrado correctamente",
                user: userStored
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al guardar el usuario"
        })
    }

}


/******************LOGIN DE  USUARIO
**************************************/
const login = async(req, res) => {
    //Recogemos los parametros que nos lleguen del body
    let params = req.body;



    if(!params.name || !params.password){
        return res.status(400).send({
            status: "error",
            message: "Datos incompletos"
        })
    }
    //Buscamos en la bbdd si el usuario existe
    try 
    {
        const user = await UserModel.findOne({name: params.name}).exec();


        if(!user)
        {
            return res.status(400).send({
                status: "error",
                message: "El usuario no existe"
            })
        }

        //Comprobamos la contraseña
        const pwd = bcrypt.compareSync(params.password, user.password);
        if(!pwd)
        {
            return res.status(400).send({
                status: "error",
                message: "Contraseña no válida"
            })
        }

        return res.status(200).send({
            status: "success",
            message: user

        })
    }
    catch (error) 
    {
        return res.status(400).send({
            status: "error",
            message: "Ha fallado la consulta"
        })
    }

}



/********************************************EXPORTAMOS LOS METODOS
************************************************************************/
module.exports = {
    nuevoUser,
    login
}