import { pool } from '../config';
import { writeFile } from 'node:fs';
import fs from 'node:fs';
// import {backend_path} from '../config'

export const getCortesBD = () => {
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT nombre_corte as nombre,descripcion,marca,precio,promocion,pathImagen FROM corte;',
			(err, result) => {
				if (err) {
					console.log(err);
					reject('Error obteniendo cortes en la BD');
				} else {
					resolv(result);
				}
			}
		);
	});
};
export const insertarCorteBD = (
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
				'INSERT INTO corte VALUES(?,?,?,?,?,?)',
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
		//Consultar en la base de datos el count(*) de la tabla de cortes y sumarle uno
		pool.query(
			'SELECT COUNT(*) as cantidad FROM corte',
			(err, result: any) => {
				if (err) {
					console.log(err);
					reject('Error consultado count de corte');
				} else {
					console.log('Count de cortes: ' + result);
					const nuevoNum = result.cantidad + 1;
					const path =
						'assets/images/cortes/corte' + nuevoNum + '.jpg';
					writeFile(path, imagenFile.buffer, (err) => {
						if (err) {
							console.log(err);
							reject('Error guardando imagen de corte');
						} else {
							resolv(path);
						}
					});
				}
			}
		);
	});
};

export const getCorteBD = (nombre: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT * FROM corte WHERE nombre_corte=?',
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
export const borrarCorteBD = (nombre: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'DELETE FROM corte WHERE nombre=?',
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
export const modificarCorteBD = (id: string, body: any) => {
	//La carga de imagen se realiza en un método aparte
	return new Promise<boolean>((resolv, reject) => {
		pool.query(
			`UPDATE corte
				   SET descripcion=?,marca=?,precio=?
				   WHERE nombre_corte=?
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
export const borrarImagenCortePorPath = (pathImagen: string) => {
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
export const borrarImagenCortePorId = (id: string) => {
	//Elimina el corte 
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT pathImagen from corte WHERE nombre_corte=?',
			[id],
			(err, result:any) => {
				if (err) {
					console.log(err);
					reject('Error consultando pathImagen de corte');
				} else {
					if(!result.pathImagen){
						reject("No existe el id de corte para borrar su imagen")
					}
					fs.rm(result.pathImagen,async (err) => {
						if (err) {
							console.log(err);
							reject('Error');
						} else {
							pool.query('UPDATE corte SET pathImagen=null WHERE nombre_corte=?',[id],(err,result:any)=>{
								if(err){
									console.log(err)
									reject("Error actualizando pathImagen en null en corte")
								}else{
									if(result.affectedRows==1){
										resolv("OK")
									}else{
										reject("No existe el id especificado para borrar la imagen del corte")
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
		pool.query('UPDATE corte SET pathImagen=? WHERE nombre_corte=?',[path,id],(err,result:any)=>{
			if(err){
				console.log(err)
				reject("Error actualizando pathImagen en la BD en corte")
			}else{
				if(result.affectedRows==1){
					resolv("OK")
				}else{
					reject("No existe el id en corte")
				}
			}
		})
	})
}
