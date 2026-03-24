import { Router } from 'express';
import * as cortesController from '../controller/cortes';
import { estaLogueado, esAdmin } from '../controller/login';
const multer = require('multer');
// Configuración de almacenamiento
const storage = multer.diskStorage({
	destination: (req: any, file: any, cb: any) => {
		let carpeta = req.body.tipoProducto;
		cb(null, 'assets/images/' + carpeta + 's');
	},
	filename: (req: any, file: any, cb: any) => {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({
	storage,
	limits: {
		fieldSize: 5 * 1024 * 1024, // 5 MB (ajusta según necesites)
		fieldNameSize: 1000 // Opcional: límite para el nombre de la llave
	}
});
export const cortesRouter = Router();

const hayNuevaImagen = (req: any, res: any, next: any) => {
	//Guardar imagen nueva solo si hay que actualizar
	console.log(req.body);
	if (req.body.hayNuevaImagen) {
		upload.single('image');
		next();
	} else {
		next();
	}
};
cortesRouter.get('/cortes', cortesController.getCortes);
cortesRouter.get('/corte/:nombre', cortesController.getCorte);
cortesRouter.post(
	'/corte/crear',
	estaLogueado,
	esAdmin,
	upload.single('image'),
	cortesController.registrarCorte
);
cortesRouter.delete(
	'/corte/:nombre',
	estaLogueado,
	esAdmin,
	cortesController.borrarCorte
);
cortesRouter.put(
	'/corte/:nombre',
	estaLogueado,
	esAdmin,
	upload.single('image'),
	cortesController.modificarCorte
);
