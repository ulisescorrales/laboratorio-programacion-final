import express,{Express} from 'express';
import bodyParser from 'body-parser';
import {Router} from 'express'
import cors from 'cors';
import { backend_path } from './config'
import { cervezasRouter } from './routes/cervezas_router'
import { cortesRouter } from './routes/cortes_router'
import { loginRouter } from './routes/login_router'
import { turnosRouter } from './routes/turnos_router'
import env from 'dotenv';
const port = 3000;



const app:Express = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router=Router();
app.use("/api/",router)
app.use(express.static("assets"))
app.use("/api/",cervezasRouter,cortesRouter,loginRouter,turnosRouter)
app.listen(port, () => {
	console.log('Server started on port ' + port);
});
