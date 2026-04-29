/*******************************************************************************RUTAS DE GENERICO
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/
const express = require("express");
const router = express.Router();
const GenericoController = require("../controllers/genericoController");



/****************************************************RUTAS DE GENERICO
************************************************************************/
//Ruta de nuevo generico
router.post("/nuevoGenerico", GenericoController.nuevoGN);
//Ruta de borrado de generico
router.delete("/borrarGenerico/:id", GenericoController.borrarGN);
//Ruta de edicion de generico
router.put("/editarGenerico/:id", GenericoController.editarGN);
//Ruta de listado de los generico
router.get("/listarGenerico", GenericoController.todosGN);



/***********************************************EXPORTAMOS EL ROUTER
************************************************************************/
module.exports = router;