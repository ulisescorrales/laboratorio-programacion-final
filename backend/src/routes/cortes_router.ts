import {Router} from 'express'
import * as cortesController from '../controller/cortes'
import {estaLogueado,esAdmin} from '../controller/login'

export  const cortesRouter=Router()
cortesRouter.get("/cortes",cortesController.getCortes)
cortesRouter.get("/corte/:nombre",cortesController.getCorte)
cortesRouter.post("/cortes",estaLogueado,esAdmin,cortesController.registrarCorte)
cortesRouter.delete("cortes/:nombre",estaLogueado,esAdmin,cortesController.borrarCorte)
cortesRouter.put("cortes/:nombre",estaLogueado,esAdmin,cortesController.modificarCorte)
