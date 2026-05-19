import * as cortesRepository from '../repository/cortes.js';
import * as fileSystem from '../repository/filesystem.js';

export const getCortesJSON = async (inicio, fin) => {
	try {
		const cortes = await cortesRepository.getCortesBD(inicio, fin);
		return cortes;
	} catch (err) {
		throw new Error(err.message);
	}
};
export const getCorteJSON = async (nombre) => {
	try {
		const corte = await cortesRepository.getCorteBD(nombre);
		return corte;
	} catch (err) {
		throw new Error(err);
	}
};
export const registrarCorteService = async (
	nombre,
	descripcion,
	precio,
	pathImagen
) => {
	pathImagen = pathImagen.replace('src/assets', '');
	try {
		// pathImagen=await cortesRepository.guardarImagenEnFS(imagen);
		await cortesRepository.insertarCorteBD(
			nombre,
			descripcion,
			precio,
			pathImagen
		);
	} catch (err) {
		//El controller borra la imagen
		throw new Error(err);
	}
};
export const borrarCorteService = async (nombre) => {
	try {
		let exito = await cortesRepository.borrarImagenCortePorId(nombre);
		if (exito) {
			exito = await cortesRepository.borrarCorteBD(nombre);
		}
		return exito;
	} catch (err) {
		throw new Error(err.message);
	}
};
export const modificarCorteService = async (
	nombre,
	descripcion,
	precio,
	imagenPath,
	nombreOrigen
) => {
	//si no se cargó una imagen desde el frontend, ignorar
	try {
		if (imagenPath) {
			//Borrar imagen anterior
			try {
				await cortesRepository.borrarImagenCortePorId(nombreOrigen);
			} catch {
				console.log('No se pudo borrar imagen');
			}
		}
		let exito;
		if (imagenPath) {
			exito = await cortesRepository.modificarCorteBD(
				nombre,
				descripcion,
				precio,
				imagenPath,
				nombreOrigen
			);
		} else {
			exito = await cortesRepository.modificarCorteBDSinImagen(
				nombre,
				descripcion,
				precio,
				nombreOrigen
			);
		}
		return exito;
	} catch (err) {
		console.log(err);
		if (imagenPath) {
			//Borrar imagen anterior
			try {
				await fileSystem.borrarImagenPorPath(imagenPath);
			} catch {
				console.log('No se pudo borrar imagen');
			}
		}
		throw new Error('Error en cortes service');
	}
};
export const borrarImagenCorte = async (pathImagen) => {
	await fileSystem.borrarImagenPorPath(pathImagen);
};
