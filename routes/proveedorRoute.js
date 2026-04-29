/****************************************************************************RUTAS DE PROVEEDORES
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/
const express = require("express");
const router = express.Router();
const ProveedorController = require("../controllers/proveedorController");



/************************************************RUTAS DE PROVEEDORES
************************************************************************/
//Ruta de nuevo proveedor
router.post("/nuevoProveedor", ProveedorController.nuevoProv);
//Ruta de borrar proveedor
router.delete("/borrarProveedor/:id", ProveedorController.borrarProv);
//Ruta de edicion de proveedor
router.put("/editarProveedor/:id", ProveedorController.editarProv);
//Ruta de listado  de todos los proveedores
router.get("/listarProveedor", ProveedorController.todosProv);




/***********************************************EXPORTAMOS EL ROUTER
************************************************************************/
module.exports = router;