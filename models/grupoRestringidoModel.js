/*******************************************************************MODELO DE GRUPO RESTRINGIDO
****************************************************************************************************/

/****************************************IMPORTACIONES
*********************************************************/
const { Schema, model } = require('mongoose');


/**********************************DEFINIMOS EL SCHEMA
**********************************************************/
const RestringidoSchema = Schema({
    name:{
        type: String,
        required: true
    }
});

//Este modelo se va a llamar "RestringidoModel"
//El schema que va a usar este modelo es "RestringidoSchema"
//Y se va a guardar en la coleccion "Restringidos"
module.exports = model("RestringidoModel", RestringidoSchema, "restringidos");