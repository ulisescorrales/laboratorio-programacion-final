import * as loginService from '../service/login';
import { Request, Response } from 'express';

export const crearUsuario = async (req: Request, res: Response) => {
	//Genera un par usuario, contraseña
	const user = req.body.user;
	const password = req.body.password;
	if (user) {
		if (password) {
			try {
				await loginService.generarUsuario(user, password);
				res.status(200).send('OK');
			} catch (err) {
				res.status(500).send('Error en BD');
			}
		} else {
			res.status(500).send('Falta password en el body');
		}
	} else {
		res.status(500).send('Falta user en el body');
	}
};

export const autenticarUsuario = async (req: Request, res: Response) => {
	//Authentica y crea un token
	const user = req.body.user;
	const password = req.body.password;
	if (user && password) {
		try {
			await loginService.compararContrasenias(user, password);
			const role = await loginService.getRoleUser(user);
			const token = loginService.generarToken(user, role);
			console.log('Nuevo token: ' + token);
			res.status(200).json({
				token: token,
				role: role
			});
		} catch (err) {
			res.status(401).send('Error autenticando usuario');
		}
	} else {
		res.status(500).send('Falta usuario o contraseña');
	}
};
export const verificarUsuarioSolamente = async (
	req: any,
	res: Response,
	next: any
) => {
	const authorization = req.headers.authorization;
	if (authorization) {
		const token = authorization.split(' ')[1];
		try {
			const userRole = await loginService.getUserRole(token);
			// req.user=userRole
			res.status(200).json(userRole);
		} catch (err) {
			console.log(err);
			res.status(401).send('Token inválido');
		}
	} else {
		res.status(500).send('Falta el token\n');
	}
};
export const verificarUsuario = async (req: any, res: Response, next: any) => {
	const authorization = req.headers.authorization;
	console.log(authorization);
	if (authorization) {
		const token = authorization.split(' ')[1];
		try {
			const userRole = await loginService.getUserRole(token);
			req.user = userRole;
			next();
		} catch (err) {
			res.status(401).send('Token inválido');
		}
	} else {
		res.status(500).send('Falta el token\n');
	}
};
//
export const estaLogueado = (req: any, res: any, next: any) => {
	if (req.headers.authorization != undefined) {
		next();
	} else {
		res.send(401).send('No está logueado');
	}
};
export const esAdmin = async (req: any, res: any, next: any) => {
	const token = req.headers.authorization.split(' ')[1];
	if (token != undefined) {
		console.log('Verificar token admin: ' + token);
		try {
			const role = await loginService.getRole(token);
			if (role === 'admin') {
				console.log('es admin');
				next();
			} else {
				console.log('no es admin');
				res.status(401).send('No posees rol de administrador');
			}
		} catch {
			res.status(401).send('Token vencido');
		}
	} else {
		res.status(401).send('Falta el token');
	}
};
