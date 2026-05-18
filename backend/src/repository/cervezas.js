import { pool } from '../config.js';
import fs from 'node:fs';

export const getCervezasBD = (inicio , fin ) => {
	return new Promise((resolv, reject) => {
		const cantidadElementos = fin - inicio;
		pool.query(
			'SELECT nombre_cerveza as nombre,descripcion,marca,precio,pathImagen FROM cerveza ORDER BY nro_secuencia DESC LIMIT ? OFFSET ?;',
			[cantidadElementos, inicio],
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
	nombre,
	descripcion,
	marca,
	precio,
	pathImagen
) => {
	return new Promise(async (resolv, reject) => {
		try {
			pool.query(
				'INSERT INTO cerveza(nombre_cerveza,descripcion,marca,precio,pathImagen) VALUES(?,?,?,?,?)',
				[
					nombre,
					descripcion,
					marca,
					precio.toString(),
					pathImagen
				],
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

export const getCervezaBD = (nombre) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT nombre_cerveza as nombre,descripcion,marca,precio,pathImagen FROM cerveza WHERE nombre_cerveza=?;',
			[nombre],
			(err, result) => {
				if (err) {
					console.log(err);
					reject('500');
				} else {
					if (result.length == 0) {
						reject('404');
					} else {
						resolv(result[0]);
					}
				}
			}
		);
	});
};
export const borrarCervezaBD = (nombre) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'DELETE FROM cerveza WHERE nombre_cerveza=?',
			[nombre],
			(err, result) => {
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
export const modificarCervezaBD = (
	nombre,
	descripcion,
	marca,
	precio,
	pathImagen,
	nombreOrigen 
) => {
	//La carga de imagen se realiza en un método aparte
	return new Promise((resolv, reject) => {
		let args;
		let query;
		if(pathImagen){
			pathImagen=pathImagen.replace("assets","" )
			query=`UPDATE cerveza 
				   SET nombre_cerveza=?,descripcion=?,marca=?,precio=?,pathImagen=?
				   WHERE nombre_cerveza=?;`
			args=[nombre,descripcion,marca,precio,pathImagen,nombreOrigen]
		}else{
			query=`UPDATE cerveza
				   SET nombre_cerveza=?,descripcion=?,marca=?,precio=?
				   WHERE nombre_cerveza=?;`
			args=[nombre,descripcion,marca,precio,nombreOrigen]
		}
		pool.query(
			query,
			args,
			(err, result) => {
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
export const borrarImagenCervezaPorId = (id) => {
	//Elimina el cerveza
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT pathImagen from cerveza WHERE nombre_cerveza=?',
			[id],
			(err, result) => {
				if (err) {
					console.log(err);
					reject('Error consultando pathImagen de cerveza');
				} else {
					if (result.length == 0) {
						resolv(false); //No existe id
					}
					if (!result[0].pathImagen) {
						reject(
							'No existe el id de cerveza para borrar su imagen'
						);
					}
					result[0].pathImagen = 'assets' + result[0].pathImagen;
					const path = result[0].pathImagen;
					fs.rm(path, async (err) => {
						if (err) {
							console.log(err);
							resolv(true);
						} else {
							resolv(true);
						}
					});
				}
			}
		);
	});
};
export const guardarImagenEnBD = (id, path) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'UPDATE cerveza SET pathImagen=? WHERE nombre_cerveza=?',
			[path, id],
			(err, result) => {
				if (err) {
					console.log(err);
					reject('Error actualizando pathImagen en la BD en cerveza');
				} else {
					if (result.affectedRows == 1) {
						resolv('OK');
					} else {
						reject('No existe el id en cerveza');
					}
				}
			}
		);
	});
};
