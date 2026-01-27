import * as cortesService from '../service/cortes'
export const getCortes=(req:any,res:any)=>{
	try{
		const cortes=cortesService.getCortesJSON();
		res.status(200).json(cortes);
	}catch(err){
		res.status(500).send("Error del servidor")
	}
}
