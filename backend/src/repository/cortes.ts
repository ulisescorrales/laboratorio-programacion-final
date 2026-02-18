import { pool } from '../config';
import { writeFile } from 'node:fs';
// import {backend_path} from '../config'

export const getCortesBD=()=>{
	return new Promise((resolv,reject)=>{
		pool.query('SELECT nombre_corte as nombre,descripcion,marca,precio,promocion,pathImagen FROM corte;',(err,result)=>{
			if(err) {
				console.log(err);
				reject('Error obteniendo cortes en la BD')
			}else{
				resolv(result)
			}
		})
	})
}
export const insertarCorteBD=(nombre:string,descripcion:string,marca:string,precio:number,imagen:any)=>{
	return new Promise(async (resolv,reject)=>{
		try{
			const pathImagen=await guardarImagen(imagen,nombre)
			pool.query('INSERT INTO corte VALUES(?,?,?,?,?,?)', [nombre,descripcion,marca,precio,null,pathImagen],(err,result)=>{
				if(err){
					reject(err)
				}else{
					resolv(result)
				}
			})
		}catch (err){
			reject(err)
		}
	})
}
export const guardarImagen=(imagenFile:any,nombre:string)=>{
	return new Promise((resolv,reject)=>{
		const path='assets/images/cortes/'+nombre+"jpg";
		writeFile(path,imagenFile.buffer,(err)=>{
			if(err){
				reject(err)
			}else{
				resolv(path)
			}
		})
	})
}
