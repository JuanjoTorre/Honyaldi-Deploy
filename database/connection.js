 /********************************************************FICHERO DE CONEXION A LA BBDD
******************************************************************************************/

 /********************************IMPORTAMOS MONGOOSE
**********************************************************/
const mongoose = require("mongoose");




 /*********************METODO QUE CONECTA CON LA BBDD
**********************************************************/
const connection = async() => {
      try {
            //Conexion a la base de datos que se llama 'honyaldi'
            // await mongoose.connect("mongodb://localhost:27017/honyaldi");
            await mongoose.connect(process.env.DB_CNN);
            console.log('Conectado a db: honyaldi')
      } catch (error) {
           console.log(error);
           throw new Error ('No se ha podido conectar a la base de datos') 
      }
}


 /******************************EXPORTAMOS LA CONEXION
**********************************************************/
module.exports = connection;