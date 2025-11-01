/*******************************************************************************MODELO DE PRODUCT
****************************************************************************************************/

/****************************************IMPORTACIONES
*********************************************************/
 const { Schema, model } = require('mongoose');


 /**********************************DEFINIMOS EL SCHEMA
**********************************************************/
 const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true,
        unique:true
    },
    proveedor: {
        type: String,
        required: true
    },
    generico: {
        type: String,
        required: true
    },
    concreto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: false
    },
    oferta: {
        type: Boolean,
        default: false
    },
    integral: {
        type: Boolean,
        default: false
    },
    sin_azucar: {
        type: Boolean,
        default: false
    },
    sin_gluten: {
        type: Boolean,
        default: false
    },
    vegano:{
        type: Boolean,
        default: false
    },
    sin_lactosa:{
        type: Boolean,
        default: false
    },
    alimentacion: {
        type: Boolean,
        default: false
    },
    hosteleria: {
        type: Boolean,
        default: false
    },
    vending: {
        type: Boolean,
        default: false
    },
    lote:{
        type: Boolean,
        default: false
    },
    imagen:{
        type: String
    }, 
    pdf: {
        type: String,
    }


 });

 //Este modelo se va a llamar "ProductModel"
//El schema que va a usar este modelo es "ProductSchema"
//Y se va a guardar en la coleccion "productos"
module.exports = model("ProductModel", ProductSchema, "productos");