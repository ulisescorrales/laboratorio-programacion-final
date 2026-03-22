import {Router} from 'express'
import * as cortesController from '../controller/cortes'
import {estaLogueado,esAdmin} from '../controller/login'
const multer = require("multer");
// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, "uploads/");
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
export  const cortesRouter=Router()
cortesRouter.get("/cortes",cortesController.getCortes)
cortesRouter.get("/corte/:nombre",cortesController.getCorte)
cortesRouter.post("/corte/crear",estaLogueado,esAdmin,upload.single("image"),cortesController.registrarCorte)
cortesRouter.delete("/corte/:nombre",estaLogueado,esAdmin,cortesController.borrarCorte)
cortesRouter.put("/corte/:nombre",estaLogueado,esAdmin,cortesController.modificarCorte)
