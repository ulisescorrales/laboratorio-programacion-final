import * as cortesService from '../service/cortes';

export const getCortes = async (req: any, res: any) => {
	//Aplica paginación
	//El 0 es el primer elemento
	if (!req.query.inicio || !req.query.fin) {
		res.status(400).send('No está las variables inicio o fin');
	}
	const inicio = Number(req.query.inicio);
	const fin = Number(req.query.fin);
	if (inicio > fin) {
		res.status(400).send('inicio no puede ser mayor a fin');
	}
	try {
		const cortes = await cortesService.getCortesJSON(inicio, fin);
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
	const nombre = req.body.nombre;
	const descripcion = req.body.descripcion;
	let precio = req.body.precio;
	let pathImagen = req.file.path;
	if (precio) {
		precio = Number(precio);
		console.log(req.body);
		if (nombre && descripcion && precio && pathImagen) {
			try {
				await cortesService.registrarCorteService(
					nombre,
					descripcion,
					precio,
					pathImagen
				);
				res.status(200).send('Guardado con éxito');
			} catch (err: any) {
				cortesService.borrarImagenCorte(pathImagen);
				if (err.message == '1062') {
					res.status(409).send('Ya existe corte con mismo nombre');
				} else {
					res.status(500).send('No se pudo guardar en la BD');
				}
			}
		} else {
			cortesService.borrarImagenCorte(pathImagen);
			res.status(400).send('Faltan datos en el body');
		}
	} else {
		cortesService.borrarImagenCorte(pathImagen);
		res.status(400).send('Falta el precio');
	}
};
export const borrarCorte = async (req: any, res: any) => {
	const nombre = req.params.nombre;
	try {
		const exito = await cortesService.borrarCorteService(nombre);
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
	const descripcion = req.body.descripcion;
	let precio = req.body.precio;
	let imagenPath;
	const nombreOrigen = req.body.nombreOrigen;
	if (req.body.hayNuevaImagen == 'true') {
		imagenPath = req.file.path;
	}
	try {
		const exito = await cortesService.modificarCorteService(
			nombre,
			descripcion,
			precio,
			imagenPath,
			nombreOrigen
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
