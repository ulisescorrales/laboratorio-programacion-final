import {Router} from 'express'
import * as cortesController from '../controller/cortes'
import {estaLogueado,esAdmin} from '../controller/login'

export  const cortesRouter=Router()
cortesRouter.get("/cortes",cortesController.getCortes)
cortesRouter.post("/cortes",estaLogueado,esAdmin,cortesController.registrarCorte)

