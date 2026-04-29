/*******************************************************************************RUTAS DE CONCRETO
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/
const express = require("express");
const router = express.Router();
const ConcretoController = require("../controllers/concretoController");



/****************************************************RUTAS DE CONCRETO
************************************************************************/
//Ruta de nuevo concreto
router.post("/nuevoConcreto", ConcretoController.nuevoCR);
//Ruta de borrado de concreto
router.delete("/borrarConcreto/:id", ConcretoController.borrarCR);
//Ruta de edicion de concreto
router.put("/editarConcreto/:id", ConcretoController.editarCR);
//Ruta de listado de los concreto
router.get("/listarConcreto", ConcretoController.todosCR);



/***********************************************EXPORTAMOS EL ROUTER
************************************************************************/
module.exports = router;