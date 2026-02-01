import * as cervezasService from '../service/cervezas'
export const getCervezas=async (req:any,res:any)=>{
	try{
		const cervezas=await cervezasService.getCervezasJSON()
		res.status(200).json(cervezas);
	}catch (err){
		res.status(500).send("Error obteniendo cervezas")
	}
};

