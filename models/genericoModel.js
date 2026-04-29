/******************************************************************************MODELO DE GENERICO
****************************************************************************************************/

/****************************************IMPORTACIONES
*********************************************************/
const { Schema, model } = require('mongoose');


/**********************************DEFINIMOS EL SCHEMA
**********************************************************/
const GenericoSchema = Schema({
    name:{
        type: String,
        required: true
    }
});

//Este modelo se va a llamar "GenericoModel"
//El schema que va a usar este modelo es "GenericoSchema"
//Y se va a guardar en la coleccion "genericos"
module.exports = model("GenericoModel", GenericoSchema, "genericos");