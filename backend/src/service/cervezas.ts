import * as cervezasRepository from '../repository/cervezas'
import *  as fileSystem from '../repository/filesystem'

export const getCervezasJSON=async (inicio:number,fin:number)=>{
	try{
		const cervezas=await cervezasRepository.getCervezasBD(inicio,fin)
		return cervezas
	}catch(err:any){
		throw new Error(err.message)
	}
}
export const getCervezaJSON=async(nombre:string)=>{
	try{
		const corte=await cervezasRepository.getCervezaBD(nombre)
		return corte;
	}catch(err:any){
		throw new Error(err)
	}
}
export const registrarCervezaService=async(nombre:string,descripcion:string,marca:string,precio:number,pathImagen:string)=>{
	pathImagen = pathImagen.replace('assets', '');
	try{
		await cervezasRepository.insertarCervezaBD(nombre,descripcion,marca,precio,pathImagen)
	}catch(err:any){
		//El controller borra la imagen
		throw new Error(err.message)
	}
}
export const borrarCervezaService=async(nombre:string)=>{
	try{
	let exito=await cervezasRepository.borrarImagenCervezaPorId(nombre)
	if(exito){
		exito=await cervezasRepository.borrarCervezaBD(nombre);
	}
	return exito
	}catch(err:any){
		throw new Error(err.message)
	}
}
export const  modificarCervezaService=async (
			nombre:string,
			descripcion:string,
			marca:string,
			precio:number,
			imagenPath: string,
			nombreOrigen:string)=>{
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
export const borrarImagenCerveza=async (pathImagen:string)=>{
	await fileSystem.borrarImagenPorPath(pathImagen)
}
