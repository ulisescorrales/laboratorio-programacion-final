import * as loginRepository from "../repository/login.js"
// const jwt=require('jsonwebtoken');
import jwt from 'jsonwebtoken'
const secreto='secreto'
// const bcrypt=require('bcrypt')
import bcrypt from 'bcrypt'
const saltRounds=10;

export const compararContrasenias=async(user,password)=>{
	return new Promise(async(resolv,reject)=>{
		try {
			const hash= await loginRepository.getHash(user)
			bcrypt.compare(password,hash,(err,result)=>{
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
export const generarUsuario=async(user,password)=>{
	return new Promise((resolv,reject)=>{
		bcrypt.genSalt(saltRounds,(err,salt)=>{
			if(err){
				reject(err)
			}
			bcrypt.hash(password,salt,async (err,hash)=>{
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
export const generarToken=(user,role)=>{
	return 	jwt.sign({
				user: user,
				role:role
			},secreto,{expiresIn:'1h'})
}
export const getRole=(token)=>{
	return new Promise((resolv,reject)=>{
		jwt.verify(token,secreto,(err,decoded)=>{
			if(err){
				reject("Token vencido")
			}else{
				resolv(decoded.role)
			}
		})
	})
}
export const getUserRole=(token)=>{
	//Reciben un token jwt, verifica y retorna usuario y rol asignado
	return new Promise((resolv,reject)=>{
		jwt.verify(token,secreto,(err,decoded)=>{
			if(err){
				// console.log(err)
				reject("Token inválido o vencido")
			}else{
				resolv(decoded)
			}
		})
	})
}
export const getRoleUser=async(user)=>{
	try{
		const role=await loginRepository.getRoleBD(user)
		return role;
	}catch(err){
		throw new Error(err.message)
	}
}
