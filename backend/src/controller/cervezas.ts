import * as cervezasService from '../service/cervezas'
export const getCervezas= (req:any,res:any)=>{
	try{
		const cervezas=cervezasService.getCervezasJSON()
		res.status(200).json(cervezas);
	}catch (err){
		res.status(500).send("Error obteniendo cervezas")
	}
};
