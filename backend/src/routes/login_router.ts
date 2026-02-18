import {Router} from 'express'
import {crearUsuario} from '../controller/login'
import {autenticarUsuario} from '../controller/login'
import {verificarUsuario, verificarUsuarioSolamente} from '../controller/login'

export const loginRouter=Router()
loginRouter.post("/login/crear", crearUsuario)
loginRouter.post("/login/auth", autenticarUsuario)
loginRouter.get("/login/verificar",verificarUsuarioSolamente)
