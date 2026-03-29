import { pool } from '../config';
import { writeFile } from 'node:fs';
import fs from 'node:fs';
// import {backend_path} from '../config'

export const getCortesBD = (inicio: number, fin: number) => {
	return new Promise((resolv, reject) => {
		const cantidadElementos = fin - inicio;
		pool.query(
			'SELECT nombre_corte as nombre,descripcion,marca,precio,promocion,pathImagen FROM corte ORDER BY nro_secuencia DESC LIMIT ? OFFSET ?;',
			[cantidadElementos, inicio],
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
	precio: number,
	pathImagen: string
) => {
	return new Promise(async (resolv, reject) => {
		try {
			pool.query(
				'INSERT INTO corte(nombre_corte,descripcion,precio,pathImagen) VALUES(?,?,?,?)',
				[nombre, descripcion, precio.toString(), pathImagen],
				(err, result) => {
					if (err) {
						reject(err.errno);
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

export const getCorteBD = (nombre: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT nombre_corte as nombre,descripcion,marca,precio,promocion,pathImagen FROM corte WHERE nombre_corte=?;',
			[nombre],
			(err, result: any) => {
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
export const borrarCorteBD = (nombre: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'DELETE FROM corte WHERE nombre_corte=?',
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
export const modificarCorteBDSinImagen = (
	nombre: string,
	descripcion: string,
	precio: number,
	nombreOrigen: any
) => {
	//La carga de imagen se realiza en un método aparte
	return new Promise<boolean>((resolv, reject) => {
		let args;
		let query;
		args = [nombre, descripcion, precio, nombreOrigen];
		query = `UPDATE corte
				   SET nombre_corte=?,descripcion=?,precio=?
				   WHERE nombre_corte=?;`;
		pool.query(query, args, (err, result: any) => {
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
		});
	});
};
export const modificarCorteBD = (
	nombre: string,
	descripcion: string,
	precio: number,
	pathImagen: string,
	nombreOrigen: any
) => {
	//La carga de imagen se realiza en un método aparte
	return new Promise<boolean>((resolv, reject) => {
		let args;
		let query;
		pathImagen = pathImagen.replace('assets', '');
		if (pathImagen) {
			args = [nombre, descripcion, precio, pathImagen, nombreOrigen];
			query = `UPDATE corte
				   SET nombre_corte=?,descripcion=?,precio=?,pathImagen=?
				   WHERE nombre_corte=?;`;
		} else {
			args = [nombre, descripcion, precio, nombreOrigen];
			query = `UPDATE corte
				   SET nombre_corte=?,descripcion=?,precio=?
				   WHERE nombre_corte=?;`;
		}
		pool.query(query, args, (err, result: any) => {
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
		});
	});
};
export const borrarImagenCortePorId = (id: string) => {
	//Elimina el corte
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT pathImagen from corte WHERE nombre_corte=?',
			[id],
			(err, result: any) => {
				if (err) {
					console.log(err);
					reject('Error consultando pathImagen de corte');
				} else {
					if (result.length == 0) {
						resolv(false); //No existe id
					}
					if (!result[0].pathImagen) {
						reject(
							'No existe el id de corte para borrar su imagen'
						);
					}
					result[0].pathImagen = 'assets' + result[0].pathImagen;
					const path = result[0].pathImagen;
					fs.rm(path, async (err) => {
						if (err) {
							console.log(err);
							reject('Error');
						} else {
							resolv(true);
						}
					});
				}
			}
		);
	});
};
export const guardarImagenEnBD = (id: string, path: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'UPDATE corte SET pathImagen=? WHERE nombre_corte=?',
			[path, id],
			(err, result: any) => {
				if (err) {
					console.log(err);
					reject('Error actualizando pathImagen en la BD en corte');
				} else {
					if (result.affectedRows == 1) {
						resolv('OK');
					} else {
						reject('No existe el id en corte');
					}
				}
			}
		);
	});
};
