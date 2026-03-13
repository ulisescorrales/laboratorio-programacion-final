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
export const registrarCorteService=async(nombre:string,descripcion:string,marca:string,precio:number,pathImagen:string)=>{
	try{
		await cortesRepository.insertarCorteBD(nombre,descripcion,marca,precio,pathImagen)
	}catch(err:any){
		throw new Error(err.message)
	}
}
export const borrarCorte=async(nombre:string)=>{
	try{
		const exito=await cortesRepository.borrarCorteBD(nombre);
		return exito
	}catch(err:any){
		throw new Error(err.message)
	}
}
const  modificarCorteService=(id:string,body:any)=>{
	try{
		const exito=cortesRepository
		return exito;
	}
}
