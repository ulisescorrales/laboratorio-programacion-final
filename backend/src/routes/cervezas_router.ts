import {Router} from 'express'
import { getCervezas } from '../controller/cervezas'

export  const cervezasRouter=Router()

cervezasRouter.get("/cervezas",getCervezas)
