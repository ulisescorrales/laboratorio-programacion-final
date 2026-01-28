import * as loginRepository from "../repository/login"
const jwt=require('jsonwebtoken');
const secreto='secreto'
const bcrypt=require('bcrypt')
const saltRounds=10;

export const compararContrasenias=async (user:string,password:string)=>{
	return new Promise((reject,resolv)=>{
		try {
			const hash=loginRepository.getHash(user)
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
export const generarUsuario=(user:string,password:string)=>{
	return new Promise((resolv,reject)=>{
		bcrypt.genSalt(saltRounds,(err:any,salt:any)=>{
			if(err){
				reject(err)
			}
			bcrypt.hash(password,salt,(err:any,hash:any)=>{
				if(err){
					reject(err)
				}else{
					loginRepository.insertarUser(user,hash)
					resolv("Usuario creado")
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
