const secreto='secreto'
const saltRounds=10;
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
const users=new Map()
import { Request, Response } from 'express'

export const crearUsuario=(req:Request,res:Response)=>{
	//Genera un par usuario, contraseña
	const user=req.body.user;
	const password=req.body.password
	if(user){
		if(password){
			bcrypt.genSalt(saltRounds,(err:any,salt:any)=>{
				bcrypt.hash(password,salt,(err:any,hash:any)=>{
					if(err){
						res.status(500).send("Error")
						console.log("Error: "+err)
					}else{
						users.set(user,hash)
						res.status(200).send("OK\n")
					}
				})
			})
		}else{
			console.log("Falta password en el body")
		}
	}else{
		console.log("Falta user en el body")
	}
}

export const autenticarUsuario= (req:Request,res:Response)=>{
	//Authentica y crea un token
	const user=req.body.user
	const password=req.body.password
	if(user && password){
		console.log("Comparar en "+user+" con :" +users.get(user))
		bcrypt.compare(password,users.get(user),(err:any,result:any)=>{
			if(result){
				const token=jwt.sign({
					user: user,
					role:'normal'
				},secreto,{expiresIn:'10m'})
				res.status(200).send(token)
			}else{
				res.status(400).send("Error de autenticación");
			}
		})

	}else{
		res.status(500).send("Falta usuario o contraseña")
	}
}
export const verificarUsuario=(req:Request,res:Response)=>{
	const authorization=req.headers.authorization
	if(authorization){
		const token=authorization.split(" ")[1]
		const decodificado=jwt.verify(token,secreto,(err:any,decoded:any)=>{
			res.status(200).send(decoded['user'])
		})
	}else{
		res.status(500).send("Falta el token\n")
	}
}
