/****************************************************** FICHERO DE ENTRADA A LA APLICACION
 *********************************************************************************************/



/*****************************************IMPORTAR DEPENDENCIAS
 ******************************************************************/

const connection  = require("./database/connection");
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const path = require("path");


/*****************************************MENSAJE DE BIENVENIDA
 ******************************************************************/
console.log("API NODE para HONYALDI arrancada ");


/*********************************************CONEXION A LA BBDD
 ******************************************************************/
connection();


/****************CREAMOS Y CONFIGURAMOS EL SERVIDOR DE NODE
 ******************************************************************/
const app = express();
const port = 3900;



/*********************************************CONFIGURAMOS CORS
 ******************************************************************/
app.use(cors());

/****************************MIDLEWARE DEL DIRECTORIO PUBLICO
 ******************************************************************/
app.use( express.static('public'));

/************CONVERTIMOS LOS DATOS DEL BODY A OBJETOS JSON
 ******************************************************************/
app.use(express.json());
app.use(express.urlencoded({extended: true}));



/************************************CONFIGURAMOS  LAS RUTAS
 ******************************************************************/
const DirigidoARoutes = require("./routes/dirigidoARoute");
const GrupoRestringidoRoutes = require("./routes/grupoRestringidoRoute");
const ProductRoutes = require("./routes/productRoute");
const ProveedorRoutes = require("./routes/proveedorRoute");
const GenericoRoutes = require("./routes/genericoRoutes");
const ConcretoRoutes = require("./routes/concretoRoutes");
const UserRoutes = require("./routes/userRoute");






/************CARGAMOS LAS RUTAS EN EXPRESS CON EL PREFIJO API
 ******************************************************************/
app.use("/api/dirigido", DirigidoARoutes);
app.use("/api/restringido", GrupoRestringidoRoutes);
app.use("/api/producto", ProductRoutes);
app.use("/api/proveedor", ProveedorRoutes);
app.use("/api/generico", GenericoRoutes);
app.use("/api/concreto", ConcretoRoutes);
app.use("/api/user", UserRoutes);

app.use( "/{*splat}", (req, res) => {
      res.sendFile(path.join( __dirname, 'public/index.html'));
});

//Ruta de prueba
// app.get("/ruta-prueba", (req, res) => {
//       return res.status(200).json(
//            {
//                   "id": 1,
//                   "nombre": "Kako",
//                   "web": "torreweb.es"
//            } 
//       );
// });


/********PONEMOS EL SERVIDOR A ESCUCHAR LAS PETICIONES HTTP
 ******************************************************************/
app.listen(process.env.PORT, () => {
      console.log("Servidor de node corriendo en el puerto: ", port);
});

