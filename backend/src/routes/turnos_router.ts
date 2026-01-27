import {Router} from 'express'
import {getTurnosDia,generarTurno} from '../controller/turnos';
export const turnosRouter=Router();
turnosRouter.get("/turnos/:fecha",getTurnosDia);

turnosRouter.post("/turnos/",generarTurno)
