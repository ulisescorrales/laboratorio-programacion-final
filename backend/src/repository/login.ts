import { pool } from '../config';
export const users = new Map();
export const insertarUser = (user: string, hash: string) => {
	// users.set(user,hash)
	return new Promise((resolv, reject) => {
		pool.query(
			'INSERT INTO usuario VALUES (?,?)',
			[user, hash],
			(err, result, fields) => {
				if (err) {
					console.log(err);
					reject('Error insertando usuario');
				} else {
					resolv(result);
				}
			}
		);
	});
};

export const getHash = (user: string) => {
	return new Promise((resolv, reject) => {
		pool.query(
			'SELECT `hash` FROM `usuario` WHERE `nombre_usuario` = ? ;',
			[user],
			(err, result: any, fields) => {
				if (err) {
					console.log(err);
					reject('Error en la consulta del hash del usuario');
				} else {
					resolv(result[0].hash);
				}
			}
		);
	});
};
