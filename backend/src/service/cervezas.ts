import * as cervezasRepository from '../repository/cervezas'

export const getCervezasJSON=async ()=>{
	try{
		const cervezas=await cervezasRepository.getCervezasBD()
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
export const registrarCervezaService=async(nombre:string,descripcion:string,marca:string,precio:number,imagen:any)=>{
	let pathImagen:string|null=null;
	try{
		pathImagen=await cervezasRepository.guardarImagenEnFS(imagen);
		await cervezasRepository.insertarCervezaBD(nombre,descripcion,marca,precio,pathImagen)
	}catch(err:any){
		if(pathImagen){
			//Borrar imagen
			cervezasRepository.borrarImagenCervezaPorPath(pathImagen)
		}
		throw new Error(err.message)
	}
}
export const borrarCerveza=async(nombre:string)=>{
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
export const  modificarCervezaService=async (id:string,body:any,imagen:any)=>{
	//si no se cargó una imagen desde el frontend, ignorar
	try{
		const exito= await cervezasRepository.modificarCervezaBD(id,body)
		let pathImagen;
		if(imagen){
			await cervezasRepository.borrarImagenCervezaPorId(id)
			pathImagen=await cervezasRepository.guardarImagenEnFS(imagen)
			await cervezasRepository.guardarImagenEnBD(id,pathImagen)
		}
		return exito;
	}catch(err){
		throw new Error("Error en cervezas service");
	}
}
export const borrarImagenCerveza=async (pathImagen:string)=>{
	await cervezasRepository.borrarImagenCervezaPorPath(pathImagen)
}
