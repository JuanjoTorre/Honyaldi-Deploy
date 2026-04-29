/****************************************************************************MODELO DE DIRIGIDO A
****************************************************************************************************/

/****************************************IMPORTACIONES
*********************************************************/
const { Schema, model } = require('mongoose');


/**********************************DEFINIMOS EL SCHEMA
**********************************************************/
const DirigidoASchema = Schema({
    name:{
        type: String,
        required: true
    }
});

//Este modelo se va a llamar "DirigidoAModel"
//El schema que va a usar este modelo es "DirigidoASchema"
//Y se va a guardar en la coleccion "dirigidos"
module.exports = model("DirigidoAModel", DirigidoASchema, "dirigidos");