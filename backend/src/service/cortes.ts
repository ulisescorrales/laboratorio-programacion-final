import * as cortesRepository from '../repository/cortes'

export const getCortesJSON=()=>{
	try{
		const cortes=cortesRepository.getCortesBD()
		return cortes
	}catch(err){
		throw new Error("Error de conexión al a BD")
	}
}
