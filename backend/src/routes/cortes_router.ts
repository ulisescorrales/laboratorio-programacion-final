import {Router} from 'express'
import { getCortes } from '../controller/cortes'

export  const cortesRouter=Router()

cortesRouter.get("/cortes",getCortes)
