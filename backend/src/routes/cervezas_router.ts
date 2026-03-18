import {Router} from 'express'
import * as cervezasController from '../controller/cervezas'
import {estaLogueado,esAdmin} from '../controller/login'

export  const cervezasRouter=Router()

cervezasRouter.get("/cervezas",cervezasController.getCervezas)
cervezasRouter.get("/cerveza/:nombre",cervezasController.getCerveza)
cervezasRouter.post("/cerveza/crear",estaLogueado,esAdmin,cervezasController.registrarCerveza)
cervezasRouter.delete("/cerveza/:nombre",estaLogueado,esAdmin,cervezasController.borrarCerveza)
cervezasRouter.put("/cerveza/:nombre",estaLogueado,esAdmin,cervezasController.modificarCerveza)
