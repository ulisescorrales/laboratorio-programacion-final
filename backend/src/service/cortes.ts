import * as cortesRepository from '../repository/cortes';

export const getCortesJSON = async () => {
	try {
		const cortes = await cortesRepository.getCortesBD();
		return cortes;
	} catch (err: any) {
		throw new Error(err.message);
	}
};
export const getCorteJSON = async (nombre: string) => {
	try {
		const corte = await cortesRepository.getCorteBD(nombre);
		return corte;
	} catch (err: any) {
		throw new Error(err);
	}
};
export const registrarCorteService = async (
	nombre: string,
	descripcion: string,
	precio: number,
	pathImagen: string
) => {
	try {
		// pathImagen=await cortesRepository.guardarImagenEnFS(imagen);
		await cortesRepository.insertarCorteBD(
			nombre,
			descripcion,
			precio,
			pathImagen
		);
	} catch (err: any) {
		if (pathImagen) {
			//Borrar imagen
			cortesRepository.borrarImagenCortePorPath(pathImagen);
		}
		throw new Error(err);
	}
};
export const borrarCorte = async (nombre: string) => {
	try {
		let exito = await cortesRepository.borrarImagenCortePorId(nombre);
		if (exito) {
			exito = await cortesRepository.borrarCorteBD(nombre);
		}
		return exito;
	} catch (err: any) {
		throw new Error(err.message);
	}
};
export const modificarCorteService = async (
	nombre: string,
	descripcion: string,
	precio: number,
	imagenPath: string | undefined | null
) => {
	//si no se cargó una imagen desde el frontend, ignorar
	try {
		const exito=true
		console.log(nombre)
		console.log(descripcion)
		console.log(precio)
		console.log(imagenPath)

		//const exito = await cortesRepository.modificarCorteBD(nombre,descripcion,precio,imagenPath);
		//if (imagenPath) {
		//	//Borrar imagen anterior
		//	await cortesRepository.borrarImagenCortePorId(nombre);
		//}
		return exito;
	} catch (err) {
		throw new Error('Error en cortes service');
	}
};
export const borrarImagenCorte = async (pathImagen: string) => {
	await cortesRepository.borrarImagenCortePorPath(pathImagen);
};
