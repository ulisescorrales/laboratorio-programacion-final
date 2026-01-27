import * as cervezasRepository from '../repository/cervezas'

export const getCervezasJSON=()=>{
	try{
		return cervezasRepository.getCervezasBD()
	}catch(err:any){
	 	throw new Error(err)
	}
}
