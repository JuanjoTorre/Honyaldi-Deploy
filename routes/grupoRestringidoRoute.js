/*********************************************************************RUTAS DE GRUPO RESTRINGIDO
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/
const express = require("express");
const router = express.Router();
const GrupoRestringidoController = require("../controllers/grupoRestringidoController");



/*****************************************RUTAS DE GRUPO RESTRINGIDO
************************************************************************/
//Ruta de nuevo grupo restringido
router.post("/nuevoRestringido", GrupoRestringidoController.nuevoGR);
//Ruta de borrado  de grupo restringido
router.delete("/borrarRestringido/:id", GrupoRestringidoController.borrarGR);
//Ruta de edicion de grupo restringido
router.put("/editarRestringido/:id", GrupoRestringidoController.editarGR);
//Ruta de listado de grupo restringido
router.get("/listarRestringido", GrupoRestringidoController.listarGR);






/***********************************************EXPORTAMOS EL ROUTER
************************************************************************/
module.exports = router;