import * as cervezasService from '../service/cervezas'
export const getCervezas=async (req:any,res:any)=>{
	if(!req.query.inicio || !req.query.fin){
		res.status(400).send("No están las variables inicio o fin")
	}
	const inicio=Number(req.query.inicio);
	const fin=Number(req.query.fin);
	if(inicio>fin){
		res.status(400).send("inicio no puede ser mayor a fin")
	}
	try{
		const cervezas=await cervezasService.getCervezasJSON(inicio,fin);
		res.status(200).json(cervezas);
	}catch(err){
		res.status(500).send("Error obteniendo cervezas")
	}
}
export const getCerveza=async(req:any,res:any)=>{
	const nombre=req.params.nombre
	try{
		const cerveza=await cervezasService.getCervezaJSON(nombre);
		res.status(200).json(cerveza)
	}catch(err:any){
		//err contiene el código de error
		const status = Number(err.message);
		let mensaje;
		if (status == 404) {
			mensaje = 'No existe la cerveza especificada';
		} else {
			mensaje = 'Error consultando corte';
		}
		res.status(status).send(mensaje);
	}
}

export const registrarCerveza=async(req:any,res:any)=>{
	const nombre = req.body.nombre;
	const descripcion = req.body.descripcion;
	const marca=req.body.marca
	let precio = req.body.precio;
	let pathImagen = req.file.path;
	if (precio) {
		precio = Number(precio);
		console.log(req.body);
		if (nombre && descripcion && precio && pathImagen) {
			try {
				await cervezasService.registrarCervezaService(
					nombre,
					descripcion,
					marca,
					precio,
					pathImagen
				);
				res.status(200).send('Guardado con éxito');
			} catch (err: any) {
				cervezasService.borrarImagenCerveza(pathImagen);
				if (err.message == '1062') {
					res.status(409).send('Ya existe corte con mismo nombre');
				} else {
					res.status(500).send('No se pudo guardar en la BD');
				}
			}
		} else {
			cervezasService.borrarImagenCerveza(pathImagen);
			res.status(400).send('Faltan datos en el body');
		}
	} else {
		cervezasService.borrarImagenCerveza(pathImagen);
		res.status(400).send('Falta el precio');
	}
}
export const borrarCerveza=async(req:any,res:any)=>{
	const nombre=req.params.nombre
	try{
		const exito=await cervezasService.borrarCerveza(nombre);
		if(exito){
			res.status(200).send("Elemento borrado correctamente")
		}else{
			res.status(404).send("Elemento no existe")
		}
	}catch(err){
		res.status(500).send("Error del servidor al intentar borrar el elemento")
	}
}
export const modificarCerveza=async(req:any,res:any)=>{
	const nombre=req.params.nombre
	const body=req.body
	const imagen = req.file;
	try{
		const exito= await cervezasService.modificarCervezaService(nombre,body,imagen)
		if(exito){
			res.status(200).send("OK")
		}else{
			res.status(404).send("Corte no encontrado")
		}
	}catch(err){
		res.status(500).send("Error en el server")
	}
}
