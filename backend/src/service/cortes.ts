import * as cortesRepository from '../repository/cortes'

export const getCortesJSON=async ()=>{
	try{
		const cortes=await cortesRepository.getCortesBD()
		return cortes
	}catch(err:any){
		throw new Error(err.message)
	}
}
export const getCorteJSON=async(nombre:string)=>{
	try{
		const corte=await cortesRepository.getCorteBD(nombre)
		return corte;
	}catch(err:any){
		throw new Error(err.message)
	}
}
export const registrarCorteService=async(nombre:string,descripcion:string,marca:string,precio:number,imagen:any)=>{
	let pathImagen:string|null=null;
	try{
		pathImagen=await cortesRepository.guardarImagenEnFS(imagen);
		await cortesRepository.insertarCorteBD(nombre,descripcion,marca,precio,pathImagen)
	}catch(err:any){
		if(pathImagen){
			//Borrar imagen
			cortesRepository.borrarImagenCortePorPath(pathImagen)
		}
		throw new Error(err.message)
	}
}
export const borrarCorte=async(nombre:string)=>{
	try{
	let exito=await cortesRepository.borrarImagenCortePorId(nombre)
	if(exito){
		exito=await cortesRepository.borrarCorteBD(nombre);
	}
	return exito
	}catch(err:any){
		throw new Error(err.message)
	}
}
export const  modificarCorteService=async (id:string,body:any,imagen:any)=>{
	//si no se cargó una imagen desde el frontend, ignorar
	try{
		const exito= await cortesRepository.modificarCorteBD(id,body)
		let pathImagen;
		if(imagen){
			await cortesRepository.borrarImagenCortePorId(id)
			pathImagen=await cortesRepository.guardarImagenEnFS(imagen)
			await cortesRepository.guardarImagenEnBD(id,pathImagen)
		}
		return exito;
	}catch(err){
		throw new Error("Error en cortes service");
	}
}
export const borrarImagenCorte=async (pathImagen:string)=>{
	await cortesRepository.borrarImagenCortePorPath(pathImagen)
}
