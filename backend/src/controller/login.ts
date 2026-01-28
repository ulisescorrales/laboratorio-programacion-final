import * as loginService from '../service/login'
import { Request, Response } from 'express'

export const crearUsuario=async(req:Request,res:Response)=>{
	//Genera un par usuario, contraseña
	const user=req.body.user;
	const password=req.body.password
	if(user){
		if(password){
			try{
				await loginService.generarUsuario(user,password)
				res.status(200).send("OK")
			}catch (err){
				res.status(500).send("Error")
			}
		}else{
			res.status(500).send("Falta password en el body")
		}
	}else{
		res.status(500).send("Falta user en el body")
	}
}

export const autenticarUsuario=async(req:Request,res:Response)=>{
	//Authentica y crea un token
	const user=req.body.user
	const password=req.body.password
	if(user && password){
		try{
			await loginService.compararContrasenias(user,password);
			const token=loginService.generarToken(user,'normal')
			res.status(200).json({
				token:token
			})
		}catch{
			res.status(401).send("Contraseña incorrecta")
		}
	}else{
		res.status(500).send("Falta usuario o contraseña")
	}
}
export const verificarUsuario=(req:Request,res:Response)=>{
	// const authorization=req.headers.authorization
	// if(authorization){
	// 	const token=authorization.split(" ")[1]
	// 	const decodificado=jwt.verify(token,secreto,(err:any,decoded:any)=>{
	// 		res.status(200).send(decoded['user'])
	// 	})
	// }else{
	// 	res.status(500).send("Falta el token\n")
	// }
}
//
export const estaLogueado=(req:any,res:any,next:any)=>{
	if(req.headers.authorization!=undefined){
		next();
	}else{
		res.send(401).send("No está logueado")
	}
}
export const esAdmin=async (req:any,res:any,next:any)=>{
	const token=req.headers.authorization.split[' '][1]
	if(token!=undefined){
		const role= await loginService.getRole(token);
		if(role==='admin'){
			next()
		}else{
			res.status(401).send("No posees rol de administrador")
		}
	}else{
		res.status(401).send("Falta el token")
	}
}
