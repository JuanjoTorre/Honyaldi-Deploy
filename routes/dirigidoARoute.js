/******************************************************************************RUTAS DE DIRIGIDO A
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/
const express = require("express");
const router = express.Router();
const DirigidoAController = require("../controllers/dirigidoAController");



/**************************************************RUTAS DE DIRIGIDO A
************************************************************************/
//Ruta de nuevo Dirigido a
router.post("/nuevoDirigido", DirigidoAController.nuevoDG);
//Ruta de borrado  de Dirigido a
router.delete("/borrarDirigido/:id", DirigidoAController.borrarDG);
//Ruta de edicion de Dirigido a
router.put("/editarDirigido/:id", DirigidoAController.editarDG);
//Ruta de listado de Dirigido a
router.get("/listarDirigido", DirigidoAController.listarDG);

/***********************************************EXPORTAMOS EL ROUTER
************************************************************************/
module.exports = router;