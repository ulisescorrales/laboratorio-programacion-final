import * as cervezasRepository from '../repository/cervezas'

export const getCervezasJSON=async()=>{
	try{
		return await cervezasRepository.getCervezasBD()
	}catch(err:any){
	 	throw new Error(err)
	}
}
