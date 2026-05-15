import {Router} from 'express'
import * as cervezasController from '../controller/cervezas.js'
import {estaLogueado,esAdmin} from '../controller/login.js'
import { upload } from '../controller/multer.js'
export  const cervezasRouter=Router()

cervezasRouter.get("/cervezas",cervezasController.getCervezas)
cervezasRouter.get("/cerveza/:nombre",cervezasController.getCerveza)
cervezasRouter.post("/cerveza/crear",estaLogueado,esAdmin,upload.single('image'),cervezasController.registrarCerveza)
cervezasRouter.delete("/cerveza/:nombre",estaLogueado,esAdmin,cervezasController.borrarCerveza)
cervezasRouter.put("/cerveza/:nombre",estaLogueado,esAdmin,upload.single('image'),cervezasController.modificarCerveza)
