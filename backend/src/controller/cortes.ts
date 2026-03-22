import * as cortesService from '../service/cortes';

export const getCortes = async (req: any, res: any) => {
	try {
		const cortes = await cortesService.getCortesJSON();
		res.status(200).json(cortes);
	} catch (err) {
		res.status(500).send('Error obteniendo cortes');
	}
};
export const getCorte = async (req: any, res: any) => {
	const nombre = req.params.nombre;
	try {
		const corte = await cortesService.getCorteJSON(nombre);
		res.status(200).json(corte);
	} catch (err: any) {
		//err contiene el código de error
		const status = Number(err.message);
		let mensaje;
		if (status == 404) {
			mensaje = 'No existe el corte especificado';
		} else {
			mensaje = 'Error consultando corte';
		}
		res.status(status).send(mensaje);
	}
};

export const registrarCorte = async (req: any, res: any) => {
	// console.log(req)
	console.log("............")
	console.log(req.file)
	console.log("---------------")
	console.log(req.body)
	const nombre = req.body.nombre;
	const descripcion = req.body.descripcion;
	let precio = req.body.precio;
	const imagen = req.file;
	if (precio) {
		precio = Number(precio);
		if (nombre && descripcion && precio && imagen) {
			//TODO: guardar la imagen y obtener el path relativo
			res.status(404).send('Guardado con éxito');
			// try{
			// 		await cortesService.registrarCorteService(nombre,descripcion,marca,precio,imagen)
			// 		res.status(200).send("Guardado con éxito")
			// }catch(err){
			// 		res.status(500).send("No se pudo guardar en la BD")
			// }
		} else {
			res.status(400).send('Faltan datos en el body');
		}
	} else {
		res.status(400).send('Falta el precio');
	}
};
export const borrarCorte = async (req: any, res: any) => {
	const nombre = req.params.nombre;
	try {
		const exito = await cortesService.borrarCorte(nombre);
		if (exito) {
			res.status(200).send('Elemento borrado correctamente');
		} else {
			res.status(404).send('Elemento no existe');
		}
	} catch (err) {
		res.status(500).send(
			'Error del servidor al intentar borrar el elemento'
		);
	}
};
export const modificarCorte = async (req: any, res: any) => {
	const nombre = req.params.nombre;
	const body = req.body;
	const imagen = req.file;
	try {
		const exito = await cortesService.modificarCorteService(
			nombre,
			body,
			imagen
		);
		if (exito) {
			res.status(200).send('OK');
		} else {
			res.status(404).send('Corte no encontrado');
		}
	} catch (err) {
		res.status(500).send('Error en el server');
	}
};
