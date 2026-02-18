import * as cortesRepository from '../repository/cortes'

export const getCortesJSON=async ()=>{
	try{
		const cortes=await cortesRepository.getCortesBD()
		return cortes
	}catch(err:any){
		throw new Error(err.message)
	}
}
// export const getCorteJSON=async()=>{
// 	try{
// 		const corte=await cortesRepository.getCortesBD
// 	}
// }
export const registrarCorteService=async(nombre:string,descripcion:string,marca:string,precio:number,pathImagen:string)=>{
	try{
		await cortesRepository.insertarCorteBD(nombre,descripcion,marca,precio,pathImagen)
	}catch(err:any){
		throw new Error(err.message)
	}
}
