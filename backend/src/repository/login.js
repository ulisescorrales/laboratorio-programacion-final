import { pool } from '../config.js';
export const users = new Map();
export const insertarUser = (user, hash) => {
	// users.set(user,hash)
	return new Promise((resolv, reject) => {
		pool.getConnection((err, connection) => {
			connection.beginTransaction((err) => {
				if (err) {
					console.log(err);
					connection.rollback(() => {
						connection.release();
					});
				} else {
					connection.query(
						'INSERT INTO usuario VALUES (?,?)',
						[user, hash],
						(err, result, fields) => {
							if (err) {
								console.log(err);
								connection.rollback(() => {
									connection.release();
									reject('Error insertando usuario');
								});
							} else {
								connection.query(
									'INSERT INTO usuario_rol VALUES(?,"normal")',
									[user],
									(err, result, fields) => {
										if (err) {
											console.log(err);
											connection.rollback(() => {
												connection.release();
												reject(
													'Error insertando usuario_rol'
												);
											});
										} else {
											connection.commit((err) => {
												if (err) {
													console.log(err);
												}
												connection.release();
												resolv('OK');
											});
										}
									}
								);
							}
						}
					);
				}
			});
		});
	});
};

export const getHash = (user) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'select `hash` from `usuario` where `nombre_usuario` = ? ;',
			[user],
			(err, result, fields) => {
				if (err) {
					reject('error en la consulta del hash del usuario');
				} else {
					if (result.length == 0) {
						reject('No existe el usuario');
					} else {
						resolv(result[0].hash);
					}
				}
			}
		);
	});
};
export const getRoleBD = (user) => {
	return new Promise<string>((resolv, reject) => {
		pool.query(
			'select `nombre_rol` from `usuario_rol` where `nombre_usuario` = ? ;',
			[user],
			(err, result, fields) => {
				if (err) {
					console.log(err);
					reject('error en la consulta del rol de usuario');
				} else {
					resolv(result[0].nombre_rol);
				}
			}
		);
	});
};
