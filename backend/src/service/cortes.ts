import * as cortesRepository from '../repository/cortes'

export const getCortesJSON=()=>{
	try{
		const cortes=cortesRepository.getCortesBD()
		return cortes
	}catch(err){
		throw new Error("Error de conexión al a BD")
	}
}
export const registrarCorteService=(nombre:string,descripcion:string,marca:string,precio:number,pathImagen:string)=>{
	cortesRepository.insertarCorteBD(nombre,descripcion,marca,precio,pathImagen)
}
