import {Router} from 'express'
import {crearUsuario} from '../controller/login.js'
import {autenticarUsuario} from '../controller/login.js'
import { verificarUsuarioSolamente} from '../controller/login.js'

export const loginRouter=Router()
loginRouter.post("/login/crear", crearUsuario)
loginRouter.post("/login/auth", autenticarUsuario)
loginRouter.get("/login/verificar",verificarUsuarioSolamente)
