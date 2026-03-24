import {Router} from 'express'
import * as cervezasController from '../controller/cervezas'
import {estaLogueado,esAdmin} from '../controller/login'
import { upload } from '../controller/multer'
export  const cervezasRouter=Router()

cervezasRouter.get("/cervezas",cervezasController.getCervezas)
cervezasRouter.get("/cerveza/:nombre",cervezasController.getCerveza)
cervezasRouter.post("/cerveza/crear",estaLogueado,esAdmin,upload.single('image'),cervezasController.registrarCerveza)
cervezasRouter.delete("/cerveza/:nombre",estaLogueado,esAdmin,cervezasController.borrarCerveza)
cervezasRouter.put("/cerveza/:nombre",estaLogueado,esAdmin,upload.single('image'),cervezasController.modificarCerveza)
