/************************************************************************CONTROLADOR DE PRODUCTS
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/

//Dependecias y modulos
const { validarProducto } = require("../helpers/validar");

//Modelos
const ProductModel = require("../models/productModel");

/*****************************METODOS DEL CONTROLADOR DE PRODUCTS
 ************************************************************************/

/**********CREAR UN NUEVO PRODUCTO
 **************************************/
const nuevoProduct = async (req, res) => {
	//Recogemos los datos pasados por parametro
	let params = req.body;
	params.imagen = params.codigo + ".jpg";
	params.pdf = params.codigo + ".pdf";
	console.log(params.codigo);

	//Validar los datos
	try {
		validarProducto(params);
	} catch (error) {
		return res.status(400).json({
			status: "error",
			mensaje: "Faltan datos por enviar",
			params,
		});
	}

	//Control de productos duplicados
	try {
		const products = await ProductModel.find({
			$or: [{ name: params.name }, { codigo: params.codigo }],
		}).exec();

		//Si la consulta es ok pero encontramos un producto que ya existe
		if (products && products.length >= 1) {
			return res.status(400).send({
				status: "error",
				message: "El producto ya existe",
			});
		}

		//Creamos un objeto de producto con los datos que nos llegan a traves de params
		let productToSave = new ProductModel(params);

		//Guardamos el producto en la bbdd
		try {
			const productStored = await productToSave.save();

			if (productStored) {
				//Devolvemos el resultado
				return res.status(200).send({
					status: "success",
					message: "Producto registrado correctamente",
					product: productStored,
				});
			}
		} catch (error) {
			return res.status(500).send({
				status: "error",
				message: "Error al guardar el producto",
				producttosave: productToSave,
			});
		}
	} catch (error) {
		return res.status(500).send({
			status: "error",
			message: "Error general en la consulta",
		});
	}
};

/****************BORRAR UN  PRODUCTO
 **************************************/
const borrarProduct = async (req, res) => {
	//Conseguimos el id del producto. Nos llegara a traves de la url
	const productoId = req.params.id;

	//Buscamos el producto en la base de datos y la borramos

	try {
		const productToDeleted = await ProductModel.findByIdAndDelete({
			_id: productoId,
		});

		if (productToDeleted == null) {
			return res.status(400).send({
				status: "error",
				message: "Producto no encontrado",
			});
		}

		//Devolvemos la respuesta
		return res.status(200).send({
			status: "success",
			message: "Producto borrado",
			product: productToDeleted,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/**********SELECCIONAR UN  PRODUCTO
 **************************************/
const product = async (req, res) => {
	//Conseguimos el id del producto. Nos llegara a traves de la url
	const productoId = req.params.id;

	//Buscamos el producto en la base de datos y lo devolvemos
	try {
		const producto = await ProductModel.findById({ _id: productoId });

		if (producto == null) {
			return res.status(400).send({
				status: "error",
				message: "Null",
			});
		}
		return res.status(200).send({
			status: "success",
			message: "Ruta de select un producto",
			producto: producto,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Fallo de consulta general",
		});
	}
};

/****************EDITAR UN PRODUCTO
 **************************************/
const editarProduct = async (req, res) => {
	//Conseguimos el id del producto, nos llegará por la url
	const productId = req.params.id;
	//Conseguimos el producto a editar
	const productToEdit = req.body;

	//Validar los datos
	// try {
	// 	validarProducto(productToEdit);
	// } catch (error) {
	// 	return res.status(400).json({
	// 		status: "error",
	// 		mensaje: "Faltan datos por enviar",
	// 	});
	// }

	//Buscamos y actualizamos el producto en la base de datos
	try {
		let productActualizado = await ProductModel.findOneAndUpdate(
			{ _id: productId },
			productToEdit,
			{
				new: true,
			}
		).exec();

		//Devolvemos la respuesta con un exito o fracaso
		if (!productActualizado) {
			return res.status(400).send({
				status: "error",
				message: "No se ha encontrado el producto a actualizar",
			});
		} else {
			return res.status(200).send({
				status: "success",
				message: `El producto ${productActualizado.codigo} ha sido actualizado con exito`,
			});
		}
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general en la consulta",
		});
	}
};

/*******LISTAR TODOS LOS PRODUCTOS
 **************************************/
const todosProducts = async (req, res) => {
	//Hacemos la consulta
	try {
		const todos = await ProductModel.find()
			.sort({ oferta: "desc", codigo: "asc" })
			.exec();
		//const todos = await ProductModel.find().sort({codigo:"asc"}).paginate(page, itemsPerPage).exec();

		//Obtenemos el total de productos
		let total = await ProductModel.find();

		if (!todos) {
			return res.status(400).send({
				status: "error",
				message: "Error en la consulta",
			});
		}

		return res.status(200).send({
			status: "success",
			productos: todos,
			total: total.length,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/*LISTAR TODOS LOS PRODUCTOS DE UN PROVEEDOR
 ***************************************************/
const listarProductosProveedor = async (req, res) => {
	//Recogemos el proveedor del filtro
	const prov = req.params.name;

	//Hacemos la consulta
	try {
		const todosProv = await ProductModel.find({ proveedor: prov })
			.sort({ codigo: "asc" })
			.exec();

		//Obtenemos el total de productos
		let totalProv = await ProductModel.find({ proveedor: prov });

		if (!todosProv) {
			return res.status(400).send({
				status: "error",
				message: "Error en la consulta",
			});
		}

		return res.status(200).send({
			status: "success",
			message: `Los productos del proveedor:  ${prov} son..`,
			productos: todosProv,
			totalProv: totalProv.length,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/*LISTAR TODOS LOS PRODUCTOS DE UN GRUPO RESTRINGIDO
 ************************************************************/
const listarProductosRestringido = async (req, res) => {
	//Recogemos el restringido del filtro
	let gr = req.params.name;

	if (gr == "Integral") {
		//Hacemos la consulta
		try {
			const todosGR = await ProductModel.find({ integral: true })
				.sort({ codigo: "asc" })
				.exec();

			//Obtenemos el total de productos
			let totalGR = await ProductModel.find({ integral: true });

			if (!todosGR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del grupo restringido  ${gr} son..`,
				productos: todosGR,
				totalGR: totalGR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (gr == "Sin_Azucar") {
		//Hacemos la consulta
		try {
			const todosGR = await ProductModel.find({ sin_azucar: true })
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalGR = await ProductModel.find({ sin_azucar: true });

			if (!todosGR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del grupo restringido  ${gr} son..`,
				productos: todosGR,
				totalGR: totalGR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (gr == "Sin_Gluten") {
		//Hacemos la consulta
		try {
			const todosGR = await ProductModel.find({ sin_gluten: true })
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalGR = await ProductModel.find({ sin_gluten: true });

			if (!todosGR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del grupo restringido  ${gr} son..`,
				productos: todosGR,
				totalGR: totalGR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (gr == "Vegano") {
		//Hacemos la consulta
		try {
			const todosGR = await ProductModel.find({ vegano: true })
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalGR = await ProductModel.find({ vegano: true });

			if (!todosGR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del grupo restringido  ${gr} son..`,
				productos: todosGR,
				totalGR: totalGR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (gr == "Sin_Lactosa") {
		//Hacemos la consulta
		try {
			const todosGR = await ProductModel.find({ sin_lactosa: true })
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalGR = await ProductModel.find({ sin_lactosa: true });

			if (!todosGR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del grupo restringido  ${gr} son..`,
				productos: todosGR,
				totalGR: totalGR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	return res.status(400).send({
		status: "error",
		message: "Sin categoria",
	});
};

/*LISTAR TODOS LOS PRODUCTOS DE UN GENERICO
 ***************************************************/
const listarProductosGenerico = async (req, res) => {
	//Recogemos el generico del filtro
	const gn = req.params.name;

	//Hacemos la consulta
	try {
		const todosGN = await ProductModel.find({ generico: gn })
			.sort({ codigo: "asc" })
			.exec();

		//Obtenemos el total de productos
		let totalGN = await ProductModel.find({ generico: gn });

		if (!todosGN) {
			return res.status(400).send({
				status: "error",
				message: "Error en la consulta",
			});
		}

		return res.status(200).send({
			status: "success",
			message: `Los productos del generico  ${gn} son..`,
			productos: todosGN,
			total: totalGN.length,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/*LISTAR TODOS LOS PRODUCTOS DE UN CONCRETO
 ***************************************************/
const listarProductosConcreto = async (req, res) => {
	//Recogemos el generico del filtro
	const cr = req.params.name;

	//Hacemos la consulta
	try {
		const todosCR = await ProductModel.find({ concreto: cr })
			.sort({ codigo: "asc" })
			.exec();

		//Obtenemos el total de productos
		let totalCR = await ProductModel.find({ concreto: cr });

		if (!todosCR) {
			return res.status(400).send({
				status: "error",
				message: "Error en la consulta",
			});
		}

		return res.status(200).send({
			status: "success",
			message: `Los productos del concreto  ${cr} son..`,
			productos: todosCR,
			totalCR: totalCR.length,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/*LISTAR TODOS LOS PRODUCTOS DE UN DIRIGIDO A
 ***************************************************/
const listarProductosDirigido = async (req, res) => {
	//Recogemos el dirigido del filtro
	let dir = req.params.name;

	if (dir == "Alimentacion") {
		//Hacemos la consulta
		try {
			const todosDIR = await ProductModel.find({
				alimentacion: true,
			})
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalDIR = await ProductModel.find({
				alimentacion: true,
			});

			if (!todosDIR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del dirigido  ${dir} son..`,
				productos: todosDIR,
				totalDIR: totalDIR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (dir == "Hosteleria") {
		//Hacemos la consulta
		try {
			const todosDIR = await ProductModel.find({ hosteleria: true })
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalDIR = await ProductModel.find({ hosteleria: true });

			if (!todosDIR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del  dirigido  ${dir} son..`,
				productos: todosDIR,
				totalDIR: totalDIR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (dir == "Vending") {
		//Hacemos la consulta
		try {
			const todosDIR = await ProductModel.find({ vending: true })
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalDIR = await ProductModel.find({ vending: true });

			if (!todosDIR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del dirigido  ${dir} son..`,
				productos: todosDIR,
				totalDIR: totalDIR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (dir == "Ofertas") {
		//Hacemos la consulta
		try {
			const todosDIR = await ProductModel.find({ oferta: true })
				.sort("_id")
				.exec();

			//Obtenemos el total de productos
			let totalDIR = await ProductModel.find({ oferta: true });

			if (!todosDIR) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del dirigido  ${dir} son..`,
				productos: todosDIR,
				totalDIR: totalDIR.length,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
};

/********************************************EXPORTAMOS LOS METODOS
 ************************************************************************/
module.exports = {
	nuevoProduct,
	borrarProduct,
	product,
	editarProduct,
	todosProducts,
	listarProductosProveedor,
	listarProductosRestringido,
	listarProductosGenerico,
	listarProductosConcreto,
	listarProductosDirigido,
};
