/********************************************************************************RUTAS DE PRODUCTS
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

/****************************************************RUTAS DE PRODUCTS
 ************************************************************************/
//Ruta de nuevo producto
router.post("/nuevoProducto", ProductController.nuevoProduct);
//Ruta de borrado de producto
router.delete("/borrarProducto/:id", ProductController.borrarProduct);
//Ruta de seleccion de producto
router.get("/producto/:id", ProductController.product);
//Ruta de edicion de producto
router.put("/editarProducto/:id", ProductController.editarProduct);
//Ruta de listado de todos los productos
router.get("/listarProductos", ProductController.todosProducts);
//Ruta de listado de todos los productos, con las ofertas primero y sin los que no esten activos
router.get("/listarProductosOA", ProductController.todosProducts);

//Ruta de listado de productos de un proveedor
router.get("/listarProductosProveedor/:name", ProductController.listarProductosProveedor);
//Ruta de listado de productos de un grupo restringido
router.get("/listarProductosRestringido/:name", ProductController.listarProductosRestringido);
//Ruta de listado de productos de un generico
router.get("/listarProductosGenerico/:name", ProductController.listarProductosGenerico);
//Ruta de listado de productos de un  concreto
router.get("/listarProductosConcreto/:name", ProductController.listarProductosConcreto);
//Ruta de listado de productos de un dirigido
router.get("/listarProductosDirigido/:name", ProductController.listarProductosDirigido);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
