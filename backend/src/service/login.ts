import * as loginRepository from "../repository/login"
const jwt=require('jsonwebtoken');
const secreto='secreto'
const bcrypt=require('bcrypt')
const saltRounds=10;

export const compararContrasenias=async(user:string,password:string)=>{
	return new Promise(async(resolv,reject)=>{
		try {
			const hash= await loginRepository.getHash(user)
			bcrypt.compare(password,hash,(err:any,result:any)=>{
			if(err){
				reject(err)
			}else{
				if(result){
					resolv("Contraseñas coinciden")
				}else{
					reject("Password Incorrecta")
				}
			}
		})
		}catch{
			reject("Error en BD")
		}
	})
}
export const generarUsuario=async(user:string,password:string)=>{
	return new Promise((resolv,reject)=>{
		bcrypt.genSalt(saltRounds,(err:any,salt:any)=>{
			if(err){
				reject(err)
			}
			bcrypt.hash(password,salt,async (err:any,hash:any)=>{
				if(err){
					reject(err)
				}else{
					try{
						await loginRepository.insertarUser(user,hash)
						resolv("Usuario creado")
					}catch(err){
						console.log("Service - login: "+ err)
						reject(err)
					}
				}
			})
		})

	})
}
export const generarToken=(user:string,role:string)=>{
	return 	jwt.sign({
				user: user,
				role:'normal'
			},secreto,{expiresIn:'1h'})
}
export const getRole=(token:string)=>{
	return new Promise<string>((resolv,reject)=>{
		jwt.verify(token,secreto,(err:any,decoded:any)=>{
			if(err){
				reject(err)
			}else{
				resolv(decoded)
			}
		})
	})
}
export const getUserRole=(token:string)=>{
	//Reciben un token jwt, verifica y retorna usuario y rol asignado
	return new Promise((resolv,reject)=>{
		jwt.verify(token,secreto,(err:any,decoded:any)=>{
			if(err){
				console.log(err)
				reject("Error en jwt")
			}else{
				resolv(decoded)
			}
		})
	})
}
