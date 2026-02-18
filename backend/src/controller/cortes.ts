import * as cortesService from '../service/cortes'
const jwt=require('jsonwebtoken')
export const getCortes=async (req:any,res:any)=>{
	try{
		const cortes=await cortesService.getCortesJSON();
		res.status(200).json(cortes);
	}catch(err){
		res.status(500).send("Error obteniendo cortes")
	}
}
export const getCorte=async(req:any,res:any)=>{
	const nombre=req.params.nombre
	try{
		const corte=await cortesService.getCorteJSON(nombre);
		res.statuc(200).json(corte)
	}catch(err){
		res.status(500).send("Error obteniendo el corte '"+nombre+"'")
	}
}

export const registrarCorte=async(req:any,res:any)=>{
	const nombre=req.body.nombre;
	const descripcion=req.body.descripcion;
	const marca = req.body.marca
	let precio= req.body.precio
	const imagen = req.file;
	if(precio){
		precio=Number(precio)
	}else{
		res.send(400).send("Falta el precio")
	}
	if( nombre && descripcion && marca && precio && imagen ){
		//TODO: guardar la imagen y obtener el path relativo
		try{
				await cortesService.registrarCorteService(nombre,descripcion,marca,precio,imagen)
				res.status(200).send("Guardado con éxito")
		}catch(err){
			console.log(err)
				res.status(500).send("No se pudo guardar en la BD")
		}
	}else{
		res.status(400).send("Faltan datos en el body")
	}
}
