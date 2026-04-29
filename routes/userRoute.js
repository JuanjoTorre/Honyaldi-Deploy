/***********************************************************************************RUTAS DE USERS
****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
************************************************************************/
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");



/*******************************************************RUTAS DE USERS
************************************************************************/
//Ruta de nuevo usuario
router.post("/nuevoUsuario", UserController.nuevoUser);
//Ruta de login de usuario
router.post("/login", UserController.login);





/***********************************************EXPORTAMOS EL ROUTER
************************************************************************/
module.exports = router;