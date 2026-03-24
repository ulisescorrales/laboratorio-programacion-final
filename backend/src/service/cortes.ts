import * as cortesRepository from '../repository/cortes';
import * as fileSystem from '../repository/filesystem'

export const getCortesJSON = async (inicio:number,fin:number) => {
	try {
		const cortes = await cortesRepository.getCortesBD(inicio,fin);
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
	pathImagen = pathImagen.replace('assets', '');
	try {
		// pathImagen=await cortesRepository.guardarImagenEnFS(imagen);
		await cortesRepository.insertarCorteBD(
			nombre,
			descripcion,
			precio,
			pathImagen
		);
	} catch (err: any) {
		//El controller borra la imagen
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
	imagenPath: string | undefined | null,
	nombreOrigen:string
) => {
	//si no se cargó una imagen desde el frontend, ignorar
	try {
		if (imagenPath) {
			//Borrar imagen anterior
			try{
			await cortesRepository.borrarImagenCortePorId(nombreOrigen)
			}catch{console.log("No se pudo borrar imagen")}
		}
		const exito = await cortesRepository.modificarCorteBD(nombre,descripcion,precio,imagenPath,nombreOrigen);
		return exito;
	} catch (err) {
		if (imagenPath) {
			//Borrar imagen anterior
			try{
			await fileSystem.borrarImagenPorPath(imagenPath)
			}catch{ console.log("No se pudo borrar imagen") }
		}
		throw new Error('Error en cortes service');
	}
};
export const borrarImagenCorte = async (pathImagen: string) => {
	await fileSystem.borrarImagenPorPath(pathImagen);
};
