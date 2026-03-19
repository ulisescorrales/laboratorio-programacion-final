import {Router} from 'express'
import * as productoController from '../controller/producto'
import {estaLogueado,esAdmin} from '../controller/login'

export  const productoRouter=Router()
productoRouter.get("/productos/:tipoProducto",productoController.getCortes)
productoRouter.get("/corte/:nombre",productoController.getCorte)
productoRouter.post("/corte/crear",estaLogueado,esAdmin,productoController.registrarCorte)
productoRouter.delete("corte/:nombre",estaLogueado,esAdmin,productoController.borrarCorte)
productoRouter.put("corte/:nombre",estaLogueado,esAdmin,productoController.modificarCorte)
