import * as cervezasRepository from '../repository/cervezas.js'
import *  as fileSystem from '../repository/filesystem.js'

export const getCervezasJSON=async (inicio,fin)=>{
	try{
		const cervezas=await cervezasRepository.getCervezasBD(inicio,fin)
		return cervezas
	}catch(err){
		throw new Error(err.message)
	}
}
export const getCervezaJSON=async(nombre)=>{
	try{
		const corte=await cervezasRepository.getCervezaBD(nombre)
		return corte;
	}catch(err){
		throw new Error(err)
	}
}
export const registrarCervezaService=async(nombre,descripcion,marca,precio,pathImagen)=>{
	pathImagen = pathImagen.replace('assets', '');
	try{
		await cervezasRepository.insertarCervezaBD(nombre,descripcion,marca,precio,pathImagen)
	}catch(err){
		//El controller borra la imagen
		throw new Error(err.message)
	}
}
export const borrarCervezaService=async(nombre)=>{
	try{
	let exito=await cervezasRepository.borrarImagenCervezaPorId(nombre)
	if(exito){
		exito=await cervezasRepository.borrarCervezaBD(nombre);
	}
	return exito
	}catch(err){
		throw new Error(err.message)
	}
}
export const  modificarCervezaService=async (
			nombre,
			descripcion,
			marca,
			precio,
			imagenPath,
			nombreOrigen)=>{
	//si no se cargó una imagen desde el frontend, ignorar
	try {
		if (imagenPath) {
			//Borrar imagen anterior
			try{
			await cervezasRepository.borrarImagenCervezaPorId(nombreOrigen)
			}catch{console.log("No se pudo borrar imagen")}
		}
		const exito = await cervezasRepository.modificarCervezaBD(nombre,descripcion,marca,precio,imagenPath,nombreOrigen);
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
}
export const borrarImagenCerveza=async (pathImagen)=>{
	await fileSystem.borrarImagenPorPath(pathImagen)
}
