import { pool } from '../config';
import { writeFile } from 'node:fs';
import fs from 'node:fs';
// import {backend_path} from '../config'

export const getCervezasBD = (inicio:number,fin:number) => {
	return new Promise((resolv, reject) => {
		const cantidadElementos=fin-inicio;
		pool.query(
			'SELECT nombre_cerveza as nombre,descripcion,marca,precio,promocion,pathImagen FROM cerveza LIMIT ? OFFSET ?;',
			[cantidadElementos,inicio],
			(err, result) => {
				if (err) {
					console.log(err);
					reject('Error obteniendo cervezas en la BD');
				} else {
					resolv(result);
				}
			}
		);
	});
};
export const insertarCervezaBD = (
	nombre: string,
	descripcion: string,
	marca: string,
	precio: number,
	imagen: any
) => {
	return new Promise(async (resolv, reject) => {
		try {
			//TODO:colocar esto en el service
			const pathImagen = await guardarImagenEnFS(imagen);
			pool.query(
				'INSERT INTO cerveza VALUES(?,?,?,?,?,?)',
				[nombre, descripcion, marca, precio, null, pathImagen],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolv(result);
					}
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};
export const guardarImagenEnFS = (imagenFile: any) => {
	//Se guardará secuencialmente en la carpeta
	return new Promise<string>((resolv, reject) => {
		//Consultar en la base de datos el count(*) de la tabla de cervezas y sumarle uno
		pool.query(
			'SELECT COUNT(*) as cantidad FROM cerveza',
			(err, result: any) => {
				if (err) {
					console.log(err);
					reject('Error consultado count de cerveza');
				} else {
					console.log('Count de cervezas: ' + result);
					const nuevoNum = result.cantidad + 1;
					const path =
						'assets/images/cervezas/cerveza' + nuevoNum + '.jpg';
					writeFile(path, imagenFile.buffer, (err) => {
						if (err) {
							console.log(err);
							reject('Error guardando imagen de cerveza');
						} else {
							resolv(path);
						}
					});
				}
			}
		);
	});
};

export const getCervezaBD = (nombre: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT nombre_cerveza as nombre,descripcion,marca,precio,promocion,pathImagen FROM cerveza WHERE nombre_cerveza=?;',
			[nombre],
			(err,result:any) => {
				if (err) {
					console.log(err)
					reject('500');
				} else {
					if(result.length==0){
						reject('404')
					}else{
						resolv(result[0]);
					}
				}
			}
		);
	});
};
export const borrarCervezaBD = (nombre: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'DELETE FROM cerveza WHERE nombre=?',
			[nombre],
			(err, result: any) => {
				if (err) {
					console.log(err);
					reject(false);
				}
				if (result.affectedRows == 0) {
					resolv(false);
				} else if (result.affectedRows == 1) {
					resolv(true);
				} else {
					reject(false);
				}
			}
		);
	});
};
export const modificarCervezaBD = (id: string, body: any) => {
	//La carga de imagen se realiza en un método aparte
	return new Promise<boolean>((resolv, reject) => {
		pool.query(
			`UPDATE cerveza
				   SET descripcion=?,marca=?,precio=?
				   WHERE nombre_cerveza=?
				   `,
			[body.descripcion, body.marca, body.precio],
			(err, result: any) => {
				if (err) {
					console.log(err);
					reject(false);
				}
				if (result.affectedRows == 0) {
					resolv(false);
				} else if (result.affectedRows == 1) {
					resolv(true);
				} else {
					reject(false);
				}
			}
		);
	});
};
export const borrarImagenCervezaPorPath = (pathImagen: string) => {
	return new Promise((resolv, reject) => {
		fs.rm(pathImagen, (err) => {
			if (err) {
				console.log(err);
				reject('Error');
			} else {
				resolv('OK');
			}
		});
	});
};
export const borrarImagenCervezaPorId = (id: string) => {
	//Elimina el cerveza 
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT pathImagen from cerveza WHERE nombre_cerveza=?',
			[id],
			(err, result:any) => {
				if (err) {
					console.log(err);
					reject('Error consultando pathImagen de cerveza');
				} else {
					if(!result.pathImagen){
						reject("No existe el id de cerveza para borrar su imagen")
					}
					fs.rm(result.pathImagen,async (err) => {
						if (err) {
							console.log(err);
							reject('Error');
						} else {
							pool.query('UPDATE cerveza SET pathImagen=null WHERE nombre_cerveza=?',[id],(err,result:any)=>{
								if(err){
									console.log(err)
									reject("Error actualizando pathImagen en null en cerveza")
								}else{
									if(result.affectedRows==1){
										resolv("OK")
									}else{
										reject("No existe el id especificado para borrar la imagen del cerveza")
									}
								}
							})
						}
					});
				}
			}
		);
	});
};
export const guardarImagenEnBD=(id:string,path:string)=>{
	return new Promise((resolv,reject)=>{
		pool.query('UPDATE cerveza SET pathImagen=? WHERE nombre_cerveza=?',[path,id],(err,result:any)=>{
			if(err){
				console.log(err)
				reject("Error actualizando pathImagen en la BD en cerveza")
			}else{
				if(result.affectedRows==1){
					resolv("OK")
				}else{
					reject("No existe el id en cerveza")
				}
			}
		})
	})
}
