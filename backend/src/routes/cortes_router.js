import { Router } from 'express';
import * as cortesController from '../controller/cortes.js';
import { estaLogueado, esAdmin } from '../controller/login.js';
import { upload } from '../controller/multer.js'
export const cortesRouter = Router();

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
