import * as cortesService from '../service/cortes'
const jwt=require('jsonwebtoken')
export const getCortes=(req:any,res:any)=>{
	try{
		const cortes=cortesService.getCortesJSON();
		res.status(200).json(cortes);
	}catch(err){
		res.status(500).send("Error del servidor")
	}
}

export const registrarCorte=async(req:any,res:any)=>{
	const nombre=req.body.nombre;
	const descripcion=req.body.descripcion;
	const marca = req.body.marca
	let precio= req.body.precio
	const pathImagen = req.file;
	if(precio){
		precio=Number(precio)
	}else{
		res.send(400).send("Falta el precio")
	}
	if( nombre && descripcion && marca && precio && pathImagen ){
		cortesService.registrarCorteService(nombre,descripcion,marca,precio,pathImagen)
	}else{
		res.status(400).send("Faltan datos en el body")
	}
}
