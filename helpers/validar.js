/***********************************************************HELPER DE VALIDACION DE UN ARTICULO
****************************************************************************************************/


/**Importo validator para validar datos */
const validator = require('validator')




/**Validar  producto */
const validarProducto = (parametros) => {      

      let validarNombre = !validator.isEmpty(parametros.name) ;
      let validarCodigo = !validator.isEmpty(parametros.codigo);


      if (!validarNombre 
        || !validarCodigo )

      {
            throw new Error('Error de validacion de producto'); 
      }

     
}

/**Validar Proveedor */
const validarProveedor = (parametros) => {

      let validarNombre = !validator.isEmpty(parametros.name);

      if(!validarNombre)
      {
            throw new Error('Error de validacion de proveedor')
      }
}

/**Validar grupo restringido */
const validarGR = (parametros) => {
      let validarNombre = !validator.isEmpty(parametros.name);

      if(!validarNombre)
      {
            throw new Error('Error de validacion de Grupo restringido')
      }
}

/**Validar generico */
const validarGN = (parametros) => {
      let validarNombre = !validator.isEmpty(parametros.name);

      if(!validarNombre)
      {
            throw new Error('Error de validacion de generico')
      }
}

/**Validar concreto */
const validarCR = (parametros) => {

      let validarNombre = !validator.isEmpty(parametros.name );

      if(!validarNombre)
      {
            throw new Error('Error de validacion de generico')
      }
}


const validarDG = (parametros) => {
      let validarNombre = !validator.isEmpty(parametros.name);

      if(!validarNombre)
      {
            throw new Error('Error de validacion deTipo Producto')
      }
}
module.exports = {
      validarProducto,
      validarProveedor,
      validarGR,
      validarGN,
      validarCR,
      validarDG
} 
