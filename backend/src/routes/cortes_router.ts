import {Router} from 'express'
import * as cortesController from '../controller/cortes'
import {estaLogueado,esAdmin} from '../controller/login'

export  const cortesRouter=Router()
cortesRouter.get("/cortes",cortesController.getCortes)
cortesRouter.get("/corte/:nombre",cortesController.getCorte)
cortesRouter.post("/corte/crear",estaLogueado,esAdmin,cortesController.registrarCorte)
cortesRouter.delete("corte/:nombre",estaLogueado,esAdmin,cortesController.borrarCorte)
cortesRouter.put("corte/:nombre",estaLogueado,esAdmin,cortesController.modificarCorte)
